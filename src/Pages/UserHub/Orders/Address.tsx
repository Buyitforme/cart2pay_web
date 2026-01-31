import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../../redux/state";
import {
  TriggerMakeDefaultAddress,
  triggerCreateAddress,
  triggerGetAddreses,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import GoBack from "../../../Components/GoBack";
import { Input } from "../../../Components/Inputfield";
import Select from "../../../Components/Select";
import { Button } from "../../../Components/Button";
import { Text } from "../../../Components/Typography";
import { Form, Formik } from "formik";
// import { lgaOptions, stateOptions } from "./ordersHelpers";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import {
  resetMakeDefaultState,
  resetState,
} from "../../../redux/features/orderManagement/orderManagementSlice";
import { CreateAddressPayload } from "../../../redux/features/orderManagement/types";
import { PageLoader } from "../../../Components/PageLoader";
import NaijaStates from 'naija-state-local-government';
import { useMemo } from 'react';
const initialValues: any = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot be more than 15 digits"),

  state: Yup.string().required("State is required"),
  lga: Yup.string().required("LGA is required"),
  street: Yup.string()
    .trim()
    .required("Delivery address is required")
    .min(5, "Delivery address must be at least 5 characters"),
});

interface SelectOption {
  label: string;
  value: string;
}
const Address = () => {
  const navigate = useNavigate();
  const { addresses, makeDefault, error, loading, message, statusCode } =
    useSelector((state: RootState) => state.order_management);
  const dispatch: AppDispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
const naijaStates = NaijaStates as any;

// Get all states (it's an array, not a function)
console.log('LGA data structure:', JSON.stringify(naijaStates.lgas('Lagos'),null,2));
// Get all states
const stateOptions = useMemo(() => 
  naijaStates.states().map((state: string) => ({
    label: state,
    value: state
  }))
, []);

// Get LGAs for each state
const lgaOptions = useMemo(() => {
  const lgasObject: Record<string, SelectOption[]> = {};
  
  naijaStates.states().forEach((state: string) => {
    const lgaData = naijaStates.lgas(state);
    
    // Access the lgas array from the returned object
    lgasObject[state] = lgaData.lgas.map((lga: string) => ({
      label: lga,
      value: lga
    }));
  });
  
  return lgasObject;
}, []);

  useEffect(() => {
    dispatch(triggerGetAddreses({}));
  }, [dispatch]);

  useEffect(() => {
    if (addresses?.data?.results?.length > 0) {
      const defaultAddr = addresses.data.results.find(
        (addr: any) => addr.isDefault
      );

      if (defaultAddr) {
        setSelectedId(defaultAddr._id);
      }

      // explicitly show the list view
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [addresses]);

 

  const handleMakeDefaultAddress = (id: string) => {
    dispatch(TriggerMakeDefaultAddress(id));
  };
  useEffect(() => {
    if (!makeDefault.error && makeDefault.statusCode === 200) {
      toast.success(makeDefault.message);
      setTimeout(() => {
        localStorage.removeItem("cart2pay_quote_start");
       navigate(-1);
      }, 2000);
    } else if (makeDefault.error) {
      toast.error(makeDefault.message);
    }
    dispatch(resetMakeDefaultState());
  }, [
    dispatch,
    makeDefault.error,
    makeDefault.message,
    makeDefault.statusCode,
    navigate,
  ]);

  const handleCreateAddress = (values: any) => {
    const payload: CreateAddressPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      state: values.state,
      lga: values.lga,
      street: values.street,
    };
    dispatch(triggerCreateAddress(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      toast.success(message);
         dispatch(triggerGetAddreses({}));

    } else if (error) {
      toast.error(message);
    }
    dispatch(resetState());
  }, [dispatch, error, message, statusCode]);

  if (addresses.loading || !addresses.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <GoBack label={showForm ? "Add address" : "Select address"} />
       
      {showForm && !addresses.loading ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateAddress}
        >
          {({ values, setFieldValue, isValid, dirty }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  label="First name"
                  value={values.firstName}
                />
                <Input
                  name="lastName"
                  label="Last name"
                  value={values.lastName}
                />
                <Input
                  name="phone"
                  label="Phone"
                  value={values.phone}
                  type="number"
                />
                <Select
                  name="state"
                  label="State"
                  options={stateOptions}
                  value={values.state}
                  onChange={(e: any) => {
                    setFieldValue("state", e.target.value);
                    setFieldValue("lga", "");
                  }}
                />
                <Select
                  name="lga"
                  label="LGA"
                  options={lgaOptions[values.state] || []}
                  value={values.lga}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFieldValue("lga", e.target.value)
                  }
                />
                <Input name="street" label="Street" value={values.street} />
              </div>
              <div className="flex gap-2 items-center ">
                {" "}
                <Button
                  loading={loading}
                  disabled={!(isValid && dirty) || loading}
                  className="mt-4"
                  type="submit"
                >
                  Save Address
                </Button>
                {addresses?.data?.results?.length > 0 && (
  <button
                  type="button"
                  className="text-xs text-blue-500 underline"
                  onClick={() => setShowForm(false)}
                >
                  Back to select address
                </button>
                )}
              
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          {/* List of Addresses */}
          <div className="space-y-4">
            {addresses?.data?.results?.map((addr: any) => (
              <label
                key={addr._id}
                className={`flex items-center justify-between border p-4 rounded-lg cursor-pointer ${
                  selectedId === addr._id
                    ? "border-primary bg-primary/5"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedId === addr._id}
                    onChange={() => setSelectedId(addr._id)} // only update selectedId here
                  />
                  <div>
                    <Text size="sm" weight="medium">
                      {addr.firstName} {addr.lastName}
                    </Text>
                    <Text size="sm" color="muted">
                      {addr.street}, {addr.lga}, {addr.state}
                    </Text>
                    <Text size="sm" color="muted">
                      {addr.phone}
                    </Text>
                    {addr.isDefault && (
                      <Text size="xs" color="primary" className="mt-1">
                        Default
                      </Text>
                    )}
                  </div>
                </div>
                {/* <PencilIcon
                  className="w-4 h-4 text-gray-500 hover:text-primary"
                  onClick={() => handleEdit(addr._id)}
                /> */}
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              className="mt-6"
              loading={makeDefault.loading}
              variant="primary"
              disabled={!selectedId}
              onClick={() => {
                if (selectedId) {
                  handleMakeDefaultAddress(selectedId);
                }
              }}
            >
              Select Address
            </Button>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => setShowForm(true)}
            >
              Add New Address
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;
