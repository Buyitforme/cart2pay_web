import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../Components/Button";
import { Input } from "../Components/Inputfield";
import { Heading, Text } from "../Components/Typography";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import { AppDispatch, RootState } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerEditUserProfile,
  triggerGetUserProfile,
} from "../redux/features/UserAccountManagement/userAccountManagementThunk";
import { PageLoader } from "../Components/PageLoader";
import {
  triggerDeleteAddress,
  triggerEditAddress,
  triggerGetAddreses,
} from "../redux/features/orderManagement/orderManagementThunk";
import { Pencil, Trash2 } from "lucide-react";
import { EditAddressPayload } from "../redux/features/orderManagement/types";
import { lgaOptions, stateOptions } from "./UserHub/Orders/ordersHelpers";
import Select from "../Components/Select";

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
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "addresses">(
    "profile"
  );
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen]=useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { getUserProfileData, editUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management
  );
  const { addresses, editAddress,deleteAddress } = useSelector(
    (state: RootState) => state.order_management
  );
  const userData = getUserProfileData.data?.results?.data;
  const handleEditToggle = () => setIsEditing(true);

  const initialValues = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    state: userData?.state || "",
    lga: userData?.lga || "",
  };
  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().nullable(),
    state: Yup.string().nullable(),
    lga: Yup.string().nullable(),
  });

  const handleSave = async (values: any) => {
    console.log("handleSave called with:", values);
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
    };
    dispatch(triggerEditUserProfile(payload));
  };

  useEffect(() => {
    if (!editUserProfileData.error && editUserProfileData.statusCode === 200) {
      toast.success(editUserProfileData.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (editUserProfileData.error) {
      toast.error(editUserProfileData.message);
      console.log("error full object", editUserProfileData.data);
    }
  }, [
    editUserProfileData.error,
    editUserProfileData.statusCode,
    editUserProfileData.message,
    navigate,
    dispatch,
    editUserProfileData.data,
  ]);

  const handleLogout = () => {
    localStorage.clear();
    setLoading(true);
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };
  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(triggerGetAddreses({}));
  }, [dispatch]);

  console.log("Addresses", JSON.stringify(editAddress.data, null, 2));
  const handleEditAddress = (values: any) => {
    console.log('payload')
    const payload: EditAddressPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      state: values.state,
      lga: values.lga,
      street: values.street,
    };
    console.log('payload')

    dispatch(triggerEditAddress({ payload, addressId: editingAddress._id }));
  };
    const handleDeleteAddress = () => {
    dispatch(triggerDeleteAddress({ addressId: editingAddress._id }));
  };

useEffect(() => {
  if (!editAddress.error && editAddress.statusCode === 200) {
    toast.success(editAddress.message);
    localStorage.setItem("activeTab", "addresses");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else if (editAddress.error) {
    toast.error(editAddress.message);
  }
}, [editAddress.error, editAddress.message, editAddress.statusCode]);

useEffect(() => {
  if (!deleteAddress.error && deleteAddress.statusCode === 200) {
    toast.success(deleteAddress.message);
    localStorage.setItem("activeTab", "addresses");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else if (deleteAddress.error) {
    toast.error(deleteAddress.message);
  }
}, [deleteAddress.error, deleteAddress.message, deleteAddress.statusCode]);

// restore on mount
useEffect(() => {
const savedTab = localStorage.getItem("activeTab") as "addresses" | "profile" | null;
  if (savedTab) {
    setActiveTab(savedTab);
    localStorage.removeItem("activeTab");
  }
}, []);
  if (getUserProfileData.loading || !getUserProfileData.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
  // console.log("Ad", JSON.stringify(addresses, null, 2));
  return (
    <div className=" px-4">
      <div className="w-full  shadow-lg bg-white rounded-xl p-8 space-y-6">
        <div className="flex space-x-6   pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "addresses"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Address Book
          </button>
        </div>

        {activeTab === "profile" && (
          <>
            <section>
              <div className="flex justify-between items-center">
                <div>
                  <Heading size="2xl" weight="bold">
                    Profile
                  </Heading>
                  <Text size="sm" color="muted">
                    Manage your account details.
                  </Text>
                </div>
                {!isEditing && (
                  <Button variant="primary" onClick={handleEditToggle}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={ProfileSchema}
                onSubmit={(values) => {
                  console.log("🚀 Formik onSubmit triggered with:", values);
                  handleSave(values);
                }}
              >
                {({ dirty }) => (
                  <Form className="space-y-4">
                    <Input
                      label="Full Name"
                      name="fullName"
                      type="text"
                      disabled={!isEditing}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      disabled={!isEditing}
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="text"
                      disabled={!isEditing}
                    />

                    {isEditing && (
                      <div className="pt-4 flex justify-end gap-4">
                        <Button
                          type="submit"
                          variant="primary"
                          loading={editUserProfileData.loading}
                          disabled={!dirty || editUserProfileData.loading}
                        >
                          Save Changes
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
              <div className="pt-8 border-t border-gray-200">
                <Button
                  variant="destructive"
                  onClick={() => setIsModalOpen(true)}
                  // className="w-full"
                >
                  Logout
                </Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <div className="space-y-6 p-4 md:p-4">
                    <Text size="lg" weight="semibold" className="text-center">
                      Are you sure you want to logout?
                    </Text>

                    <div className="flex justify-end gap-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        loading={loading}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </section>{" "}
          </>
        )}

        {activeTab === "addresses" && (
          <div>
            <Heading size="lg" weight="bold">
              Address Book
            </Heading>
            <Text size="sm" color="muted">
              Manage your saved delivery addresses.
            </Text>

            <div className="mt-4 space-y-4">
              {addresses?.data?.results?.length > 0 ? (
                // ✅ Render address list
                <div className="space-y-3">
                  {addresses.data.results.map((addr: any) => (
                    <div
                      key={addr._id}
                      className="border rounded-lg p-4 flex justify-between items-start"
                    >
                      <div>
                        <Text size="sm" weight="semibold">
                          {addr.firstName || addr.fullName}{" "}
                          {addr.lastName ?? ""}
                          {addr.isDefault && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                              Default
                            </span>
                          )}
                        </Text>
                        <Text size="sm" color="muted">
                          {addr.phone}
                        </Text>
                        <Text size="sm" color="muted">
                          {addr.street}, {addr.lga}, {addr.state}
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setEditingAddress(addr); // store the address being edited
                            setShowForm(true); // show the form
                          }}
                        >
                          <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                        </button>
                        <button  onClick={() => {
                            setEditingAddress(addr); // store the address being edited
                            setIsDeleteModalOpen(true); // show the form
                          }}>
                          <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer" />
                        </button>
                      </div>{" "}
                    </div>
                  ))}
                </div>
              ) : (
                // ✅ Empty state
                <div className="border rounded-lg p-4 text-center">
                  <Text size="sm" color="muted">
                    No addresses yet.
                  </Text>
                </div>
              )}

              {/* ✅ Always visible Add Address button */}
              <Button
                variant="primary"
                onClick={() => navigate("address")}
              >
                Add New Address
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
          className="w-full max-w-md md:max-w-2xl"

      >
        <Heading size="lg" weight="bold">
          Edit address
        </Heading>
        <Formik
          initialValues={
            editingAddress
              ? {
                  firstName: editingAddress.firstName || "",
                  lastName: editingAddress.lastName || "",
                  phone: editingAddress.phone || "",
                  state: editingAddress.state || "",
                  lga: editingAddress.lga || "",
                  street: editingAddress.street || "",
                }
              : {
                  firstName: "",
                  lastName: "",
                  phone: "",
                  state: "",
                  lga: "",
                  street: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={handleEditAddress}
        >
          {({ values, setFieldValue, isValid, dirty }) => (
            <Form className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&_label]:text-left">
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
                <Input
                  name="phone"
                  label="Phone"
                  type="number"
                  value={values.phone}
                />
              </div>

              <div className="flex gap-2 items-center">
                <Button
                  loading={editAddress.loading}
                  disabled={!(isValid && dirty) || editAddress.loading}
                  className="mt-4"
                  type="submit"
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      {isDeleteModalOpen && (
 <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Heading size="lg" weight="bold">
          Are you sure you want to delete this address?
        </Heading>
        <div className='flex gap-6 justify-center items-center'>
              <Button
                variant="primary"
                onClick={handleDeleteAddress}
                loading={deleteAddress.loading}
              >
                Yes
              </Button>
               <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
        </div>
    
      </Modal>
      )}
      
    </div>
  );
};

export default UserProfile;
