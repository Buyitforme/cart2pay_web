import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { PencilIcon } from "lucide-react";
import { AppDispatch, RootState } from "../../../redux/state";
import {
  TriggerMakeDefaultAddress,
  triggerGetAddreses,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import GoBack from "../../../Components/GoBack";
import { Input } from "../../../Components/Inputfield";
import Select from "../../../Components/Select";
import { Button } from "../../../Components/Button";
import { Text } from "../../../Components/Typography";
import { Form, Formik } from "formik";
import { lgaOptions, stateOptions } from "./ordersHelpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetMakeDefaultState } from "../../../redux/features/orderManagement/orderManagementSlice";

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
const Address = () => {
  const navigate = useNavigate();
  const { addresses, makeDefault } = useSelector(
    (state: RootState) => state.order_management
  );
  const dispatch: AppDispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    } else {
      setShowForm(true);
    }
  }, [addresses]);

  const handleEdit = (id: string) => {
    console.log("Edit address", id);
  };

  const handleMakeDefaultAddress = () => {
      if (selectedId) {
    dispatch(TriggerMakeDefaultAddress(selectedId));
  }
  };
  useEffect(() => {
    if (!makeDefault.error && makeDefault.statusCode === 200) {
      toast.success(makeDefault.message);
      setTimeout(() => {
        localStorage.removeItem("cart2pay_quote_start");
        navigate("/dashboard/new-order");
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

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <GoBack label={showForm ? "Add address" : "Select address"} />

      {!showForm ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => console.log("hello")}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              {/* Address Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  label="Full Name"
                  value={values.fullName}
                />
                <Input
                  name="lastName"
                  label="Full Name"
                  value={values.fullName}
                />
                <Input
                  name="phone"
                  label="Phone"
                  value={values.phone}
                  type="number"
                />
                <Input name="email" label="Email" value={values.email} />
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
                <Input
                  name="street"
                  label="Delivery Address"
                  value={values.street}
                />
              </div>

              <Button className="mt-4">Save Address</Button>
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
                    onChange={() => setSelectedId(addr._id)}
                                    onClick={handleMakeDefaultAddress}

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
                <PencilIcon
                  className="w-4 h-4 text-gray-500 hover:text-primary"
                  onClick={() => handleEdit(addr._id)}
                />
              </label>
            ))}
          </div>

          <Button
            className="mt-6"
            variant="outline"
            onClick={() => setShowForm(true)}
          >
            Add New Address
          </Button>
        </>
      )}
    </div>
  );
};

export default Address;
