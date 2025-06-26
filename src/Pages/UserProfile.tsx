import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../Components/Button";
import { Input } from "../Components/Inputfield";
import { Heading,Text } from "../Components/Typography";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";


const userData = {
  fullName: "Chioma Nwabugwu",
  email: "chioma@example.com",
  phone: "08123456789",
  address: "123 Main Street",
  state: "Lagos",
  lga: "Ikeja",
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


  const handleEditToggle = () => setIsEditing(true);

  const handleSave = async (values: typeof userData) => {
    setSaving(true);
    // Simulate API save
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      toast.success("Profile successfully saved");
      console.log("Saved values:", values);
    }, 2000);
  };

   const handleLogout = () => {
     localStorage.clear();
setLoading(true)
     setTimeout(()=>{
 navigate("/signin");
     },2000)
    
   };
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
          onSubmit={handleSave}
        >
          {({ handleSubmit, isValid }) => (
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
                    loading={saving}
                    disabled={!isValid || saving}
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
            onClick={()=>setIsModalOpen(true)}
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
