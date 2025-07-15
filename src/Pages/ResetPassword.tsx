import React, { useEffect } from "react";
import AuthLayout from "../Components/AuthLayout";
import { Heading, Text } from "../Components/Typography";
import { Form, Formik } from "formik";
import { Input } from "../Components/Inputfield";
import { Button } from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { triggerResetPassword } from "../redux/features/auth/authThunk";
import toast from "react-hot-toast";
import { resetState } from "../redux/features/auth/authSlice";

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, message, loading, statusCode, data } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&^#\-_.]{8,20}$/;
  const resetPasswordSchema = Yup.object({
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
  const handleResetPassword = (values: any) => {
    const email = localStorage.getItem("cart2pay_user_email");
    const payload = {
      email: email!,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    dispatch(triggerResetPassword(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      toast.success(message);
      localStorage.removeItem("cart2pay_user_email");
      setTimeout(() => {
        navigate("/signin");
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
            Reset Password
          </Heading>
        </div>
        <Text size="sm" weight="medium" color="subtle">
          Set a new password to regain access to your account.
        </Text>
      </div>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={handleResetPassword}
      >
        {({  isValid,dirty }) => (
          <Form className="space-y-4">
            <Input label="New Password" name="password" type="password" />
            <Input
              label="Confirm New Password"
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
              Reset password
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col gap-2 items-center">
        <Text size="sm" weight="medium" color="default">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary">
            Login
          </Link>
        </Text>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
