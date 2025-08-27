import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Heading, Text } from "../../Components/Typography";
import { Input } from "../../Components/Inputfield";
import { Textarea } from "../../Components/Textarea";
import { Button } from "../../Components/Button";
import toast from "react-hot-toast";



const ShareYourStory = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";

  // 👇 Redirect ONLY inside useEffect (not outside the render cycle)
useEffect(() => {
  if (!email) {
    navigate("/signin", { state: { from: "/share-your-story" } });
  }
}, [email, navigate]);

  const initialValues = {
    email,
    fullName: "",
    story: "",
  };

  const validationSchema = Yup.object({
    story: Yup.string().required("Please tell us your story."),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    await new Promise((res) => setTimeout(res, 2000));
    resetForm();
   toast.success("THANK YOU!, Your story has been sent! Redirecting...");
   setTimeout(() => {
     navigate("/stories"); // or your actual route
   }, 3000);
  };

  return (
    <>
      {/* <MainLayout> */}

      <div className="min-h-screen px-4 py-16 bg-[#F5F7FA] flex items-start justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg space-y-6">
          <Heading size="2xl" weight="bold" className="text-[#1E2A47]">
            Tell Us Your Story
          </Heading>
          <Text size="md" color="subtle">
            We'd love to hear how we've impacted your shopping experience
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  disabled // ✅ Let Formik manage the value
                />
                <Input
                  name="fullName"
                  label="Full Name"
                  placeholder="Optional"
                />
                <Textarea
                  name="story"
                  label="Your Story"
                  placeholder="Share your experience..."
                  rows={5}
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="w-full"
                >
                  Submit Story
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* </MainLayout> */}
    </>
  );
};

export default ShareYourStory;
