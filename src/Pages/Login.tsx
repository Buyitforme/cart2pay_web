import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import { User } from "lucide-react";
import AuthLayout from "../Components/AuthLayout";
import { Input } from "../Components/Inputfield";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string } | null;
const from = (location.state as { from?: string })?.from || "/dashboard";
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    await new Promise((res) => setTimeout(res, 2000));
    localStorage.setItem("userEmail", values.email); // store email
    navigate(from); // redirect to intended page

  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex gap-2 items-center">
          <Heading size="xl" weight="bold" color="default" className="text-2xl">
            Welcome
          </Heading>
          <span className="text-4xl">
            <User />
          </span>
        </div>
        <Text size="sm" weight="medium" color="subtle">
          Securely log into your account to continue
        </Text>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-primary">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
