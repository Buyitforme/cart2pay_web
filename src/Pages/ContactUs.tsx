
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../Components/Inputfield";
import { Textarea } from "../Components/Textarea";
import { Button } from "../Components/Button";
import { Heading, Text } from "../Components/Typography";
import MainLayout from "../Components/MainLayout";
import toast from "react-hot-toast";
import { AnimatedSection } from "./LandingPage/LandingPageMain";

const ContactUs = () => {
  const initialValues = {
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message cannot be empty"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    await new Promise((res) => setTimeout(res, 1500));
    console.log("Submitted:", values);
    resetForm();
    toast.success("THANK YOU!, Your story has been sent! Redirecting...");
  };

  return (
    <>
      <AnimatedSection>
        <div className="min-h-screen bg-background px-6 py-16 flex items-start justify-center">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <Heading size="2xl" weight="bold" className="text-accent">
                We’re Happy to Help You!
              </Heading>
              <Text size="md" color="subtle">
                Need a quick response? Enter your question below, we’ll get back
                to you shortly.
              </Text>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="+234..."
                  />
                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Type your message..."
                    rows={4}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className=" mt-4"
                    loading={isSubmitting}
                  >
                    Send Message
                  </Button>

                  <Text size="sm" color="subtle" className="text-center">
                    Prefer to call or email? Reach us at{" "}
                    <a
                      href="tel:+2348000000000"
                      className="text-primary font-medium"
                    >
                      +234 800 000 0000
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:hello@cart2pay.com"
                      className="text-primary font-medium"
                    >
                      hello@cart2pay.com
                    </a>
                    .
                  </Text>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default ContactUs;
