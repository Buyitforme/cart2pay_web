import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import AuthLayout from "../Components/AuthLayout";
import { Input } from "../Components/Inputfield";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/state";
import toast from "react-hot-toast";
import { triggerSignup } from "../redux/features/auth/authThunk";
import { resetState } from "../redux/features/auth/authSlice";
import Modal from "../Components/Modal";

const Signup = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const formikRef = useRef<FormikProps<any>>(null);

  const { error, message, loading, statusCode, data } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&^#\-_.]{8,20}$/;
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone must be digits only")
      .min(10, "Minimum 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password cannot be empty")
      .matches(
        passwordRules,
        "Password must be 8-20 characters and include uppercase, lowercase, number, and special character"
      )
      .trim(),
    confirmPassword: Yup.string()
      .required("Confirm password cannot be empty")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .trim(),
  });

  const handleSignUp = (values: any) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phone: values.phoneNumber,
    };
    localStorage.setItem("cart2pay_user_email", payload.email);
    localStorage.setItem("cart2pay_otp_type", "email_verification");
    dispatch(triggerSignup(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      formikRef.current?.resetForm();
      setModalOpen(true);
    } else if (error) {
      toast.error(data?.results?.message);
    }
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch, data]);

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
          Register to get started today!
        </Text>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({  isValid,dirty }) => (
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
                disabled={!(isValid && dirty) || loading}

            >
              Create account
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-sm text-center pt-2">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary">
          Login
        </Link>
      </p>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-2">🎉 Sign up successful!</h2>
        <p>An otp has been sent to your email, kindly proceed to verify your account</p>
        <div className="pt-4"><Button onClick={() => navigate("/verification")} className="w-auto px-6">Proceed</Button></div>
        
      </Modal>
    </AuthLayout>
  );
};

export default Signup;
