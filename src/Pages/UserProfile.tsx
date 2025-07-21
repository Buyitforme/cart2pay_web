import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
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

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  lga: "",
};
const ProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  lga: Yup.string().required("LGA is required"),
});

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { getUserProfileData, editUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management
  );
  
  const userData = getUserProfileData.data?.results?.data ;
  const handleEditToggle = () => setIsEditing(true);

 const isFormDirty = (values: any) =>
    values.fullName !== initialValues.fullName ||
    values.email !== initialValues.email ||
    values.phone !== initialValues.phone;
    
  const handleSave = async (values: any) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
    address: values.address,
    state: values.state,
    lga: values.lga,
    };
    dispatch(triggerEditUserProfile(payload));
  };

  useEffect(() => {
    if (!editUserProfileData.error && editUserProfileData.statusCode === 200) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
        toast.success(editUserProfileData.message);
      }, 2000);
    } else if (editUserProfileData.error) {
      toast.error(editUserProfileData.message);
      console.log("error full object", editUserProfileData.data);
    }
    // dispatch(resetState());
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
  console.log(
    "USER PROFILE RETRIEVED",
    JSON.stringify(getUserProfileData, null, 2)
  );


  if (getUserProfileData.loading || !getUserProfileData.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-2xl shadow-lg bg-white rounded-xl p-8 space-y-6">
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
          initialValues={userData}
          validationSchema={ProfileSchema}
          enableReinitialize
          onSubmit={handleSave}
        >
          {({ handleSubmit, isValid,dirty }) => (
            
            <Form onSubmit={handleSubmit} className="space-y-4">
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
              <Input
                label="Address"
                name="address"
                type="text"
                disabled={!isEditing}
              />
              <Input
                label="State"
                name="state"
                type="text"
                disabled={!isEditing}
              />
              <Input label="LGA" name="lga" type="text" disabled={!isEditing} />

              {isEditing && (
                <div className="pt-4 flex justify-end gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={editUserProfileData.loading}
            disabled={!(isValid && isFormDirty) || editUserProfileData.loading}
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
            className="w-full"
          >
            Logout
          </Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </div>
    </div>
  );
};

export default UserProfile;


