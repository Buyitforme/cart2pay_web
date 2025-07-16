import React, { useEffect } from "react";
import AuthLayout from "../Components/AuthLayout";
import { Heading, Text } from "../Components/Typography";
import { Form, Formik } from "formik";
import { Input } from "../Components/Inputfield";
import { Button } from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/state";
import { triggerForgotPassword } from "../redux/features/auth/authThunk";
import toast from "react-hot-toast";
import { resetState } from "../redux/features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, message, loading, statusCode, data } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const forgotPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const handleForgotPassword = (values: any) => {
    const payload = {
      email: values.email,
    };
    localStorage.setItem("cart2pay_user_email", payload.email);
    localStorage.setItem("cart2pay_otp_type", "password_reset");
    dispatch(triggerForgotPassword(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      toast.success(message);
      setTimeout(() => {
        navigate("/verification");
      }, 2000);
    } else if (error) {
      toast.error(message);
      console.log("error full object", data);
    }
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch, data]);
  return (
    <AuthLayout>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex gap-2 items-center">
          <Heading size="xl" weight="bold" color="default" className="text-2xl">
            Forgot Password
          </Heading>
        </div>
        <Text size="sm" weight="medium" color="subtle">
          Enter your email and we’ll send you a link to reset your password.
        </Text>
      </div>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleForgotPassword}
      >
        {({  isValid,dirty}) => (
          <Form className="space-y-4">
            <Input label="Email" name="email" type="email" />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
  disabled={!(isValid && dirty) || loading}
            >
              Send reset otp
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col gap-2 items-center">
        <Text size="sm" weight="medium" color="default">
          Remembered your password?{" "}
          <Link to="/signin" className="text-primary">
            Login
          </Link>
        </Text>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
