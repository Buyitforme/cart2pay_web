import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../Components/Inputfield";
import { Textarea } from "../../Components/Textarea";
import { Button } from "../../Components/Button";
import { Heading, Text } from "../../Components/Typography";
import toast from "react-hot-toast";
import { AnimatedSection } from "../LandingPage/LandingPageMain";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Support = () => {
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

  return (
    <>
      <AnimatedSection>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
          {/* Hero Section */}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Get In Touch */}
              <div className="space-y-8">
                <div>
                  <Heading size="2xl" weight="bold" className="text-accent">
                    Get In Touch
                  </Heading>

                  <Text
                    size="md"
                    color="subtle"
                    className="leading-relaxed"
                    weight="light"
                  >
                    {" "}
                    We'd love to hear from you! Whether you have a question
                    about our services, need help with an order, or just want to
                    say hello, our team is ready to answer all your questions.
                  </Text>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center ">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Heading size="lg" weight="bold" className="text-accent">
                        Address
                      </Heading>
                      <Text
                        size="md"
                        color="subtle"
                        className="leading-relaxed"
                        weight="normal"
                      >
                        8 martina Ifediora street Lagos, Nigeria
                      </Text>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center ">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Heading size="lg" weight="bold" className="text-accent">
                        Phone Number
                      </Heading>
                      <Text
                        size="md"
                        color="subtle"
                        className="leading-relaxed"
                        weight="normal"
                      >
                        <a
                          href="tel:+2347033616311"
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          +234 703 361 6311
                        </a>
                      </Text>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center ">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Heading size="lg" weight="bold" className="text-accent">
                        E-Mail
                      </Heading>
                      <Text
                        size="md"
                        color="subtle"
                        className="leading-relaxed"
                        weight="normal"
                      >
                        <a
                          href="mailto:support@shopviacal.com"
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          support@shopviacal.com
                        </a>
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <Heading size="sm" weight="bold" className="text-accent pb-3">
                    Stay connected
                  </Heading>
                  <div className="flex gap-3">
                    <a
                      href="#d"
                      className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center "
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-primary" />
                    </a>
                    <a
                      href="#d"
                      className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center "
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-primary" />
                    </a>

                    <a
                      href="https://www.instagram.com/shopviacal"
                      target="blank"
                      className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center "
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
                <Heading size="2xl" weight="bold" className="text-accent">
                  Send a Message
                </Heading>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const response = await fetch(
                        "https://formspree.io/f/mqadkkre",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify(values),
                        }
                      );

                      if (response.ok) {
                        toast.success("Message sent successfully!");

                        resetForm();
                      } else {
                        toast.error("Something went wrong. Please try again.");
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Error sending message.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
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
                        className="w-auto px-6 mt-4"
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
        </div>
      </AnimatedSection>
    </>
  );
};

export default Support;
