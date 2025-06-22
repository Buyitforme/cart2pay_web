import React from "react";
import { Button } from "../Components/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "../Components/Inputfield";
import { Textarea } from "../Components/Textarea";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Nav from "../Components/Nav";
import { Heading,Text} from "../Components/Typography";

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

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
          {/* Contact Info */}
          <div className="bg-[#1E2A47] text-white p-8 flex flex-col justify-center space-y-6">
            <Heading
              size="xl"
              weight="bold"
              color="default"
              className="text-2xl text-muted_white"
            >
              Say Hello
            </Heading>
            <Text
              size="sm"
              weight="medium"
              color="subtle"
              className="text-muted_white"
            >
              Reach out to us through any of the channels below.
            </Text>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-[#708238]" />
                <Text
                  size="sm"
                  weight="medium"
                  color="subtle"
                  className="text-muted_white"
                >
                  123 Green Road, Lagos, Nigeria
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 text-[#708238]" />
                <Text
                  size="sm"
                  weight="medium"
                  color="subtle"
                  className="text-muted_white"
                >
                  hello@cart2pay.com
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 text-[#708238]" />
               
                <Text
                  size="sm"
                  weight="medium"
                  color="subtle"
                  className="text-muted_white"
                >
                  +234 800 000 0000
                </Text>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white space-y-6 flex flex-col justify-center">
            <Heading
              size="xl"
              weight="bold"
              color="default"
              className="text-2xl"
            >
              We're happy to help you!
            </Heading>
            <Text size="sm" weight="medium" color="subtle">
              Need a quick answer? Enter your question below for instant
              responses
            </Text>
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
                    className="resize-none"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-4"
                    loading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
