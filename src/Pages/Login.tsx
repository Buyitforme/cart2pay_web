import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import { User } from "lucide-react";
import AuthLayout from "../Components/AuthLayout";
import { Input } from "../Components/Inputfield";
import toast from "react-hot-toast";
import { triggerSignin } from "../redux/features/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/state";
import { resetState } from "../redux/features/auth/authSlice";
import Modal from "../Components/Modal";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formikRef = useRef<FormikProps<any>>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { error, message, loading, statusCode, data } = useSelector(
    (state: RootState) => state.auth
  );
  const from = (location.state as { from?: string })?.from || "/dashboard";
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(triggerSignin(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
            localStorage.setItem('user_full_name',data?.results?.fullName)
      formikRef.current?.resetForm();
      navigate(from);
    } else if (error && message === "Email not verified") {
      setModalOpen(true);
    } else if (error && message === "Invalid credentials") {
      toast.error(message);
    } 
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch, data, from]);

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
        onSubmit={handleSignIn}
      >
        {({  isValid,dirty }) => (
          <Form className="space-y-4">
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
  disabled={!(isValid && dirty) || loading}

            >
              Login
            </Button>
          </Form>
        )}
      </Formik>

<div className='flex flex-col gap-2 items-center'>
    <Text size="sm" weight="medium" color="default">
         Forgot password?{" "}
        <Link to="/forgot-password" className="text-primary">
          Reset
        </Link>
      </Text>
    <Text size="sm" weight="medium" color="default">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-primary">
          Sign up
        </Link>
      </Text>
</div>


      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Text size="sm" weight="medium" color="subtle">
          Email not vefified, Kindly verify your email
        </Text>{" "}
        <Button onClick={() => navigate("/verification")}>verify email</Button>
      </Modal>
    </AuthLayout>
  );
};

export default Login;
