import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import AuthLayout from "../Components/AuthLayout";
import { Input } from "../Components/Inputfield";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/state";
import toast from "react-hot-toast";
import { triggerSignup } from "../redux/features/auth/authThunk";

const Signup = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { error, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone must be digits only")
      .min(10, "Minimum 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });


    const handleSignUp = (values: any) => {
    const payload = {
      fullName:values.fullName,
      email: values.email,
      password: values.password,
      phone:values.phoneNumber,

    }
    console.log(payload)
    dispatch(triggerSignup(payload))
  }

  useEffect(() => {
    if (!error && statusCode === 200) {
          setModalOpen(true);
      setTimeout(() => {
        navigate("/auth-pin-set-up");
      }, 2000);
    } else if (error && message) {
      toast.error(message);
    }
  }, [error, statusCode, message, navigate, dispatch]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex gap-2 items-center">
          <Heading size="xl" weight="bold" color="default" className="text-2xl">
            Let's get started
          </Heading>
          <span className="text-4xl">🎉</span>
        </div>
        <Text size="sm" weight="medium" color="subtle">
          No more cart abandonment, Register to get started today!
        </Text>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input label="Full Name" name="fullName" />
            <Input label="Email" name="email" type="email" />
            <Input label="Phone Number" name="phoneNumber" type="tel" />
            <Input label="Password" name="password" type="password" />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Create account
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary">
          Login
        </Link>
      </p>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-sm text-center">
            <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
            <p>You've taken the first step on clearing your cart.</p>
            <Button
              onClick={() => {
                setModalOpen(false);
                navigate("/signin");
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Signup;
