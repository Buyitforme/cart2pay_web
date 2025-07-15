import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../Components/AuthLayout";
import { Heading, Text } from "../Components/Typography";
import { MailCheck } from "lucide-react";
import { Form, Formik, FormikProps } from "formik";
import { Button } from "../Components/Button";
import { Input } from "../Components/Inputfield";
import { AppDispatch, RootState } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  triggerOtpService,
  triggerResendOtp,
} from "../redux/features/auth/authThunk";
import toast from "react-hot-toast";
import { resetResendOtpState, resetState } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const VerificationService = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const dispatch: AppDispatch = useDispatch();
  const { error, message, loading, statusCode, data, resendOtpData } =
    useSelector((state: RootState) => state.auth);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const isOtpComplete = otpValues.every((value) => value !== '');

  const navigate = useNavigate();
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const email = localStorage.getItem("cart2pay_user_email");
    const payload = {
      email: email!,
      otp: otpValues.join(""),
    };
    dispatch(triggerOtpService(payload));
  };

  const handleResendOtp = () => {
    const email = localStorage.getItem("cart2pay_user_email");
   
    const payload = {
      email: email!,
    };
    dispatch(triggerResendOtp(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      formikRef.current?.resetForm();
      toast.success(message);
      setTimeout(() => {
        navigate("/signin");
        localStorage.removeItem("cart2pay_user_email");
      }, 2000);
    } else if (error) {
      toast.error(message);
    }
  
    dispatch(resetState());
  }, [error, statusCode, message, dispatch, data, navigate]);

  useEffect(() => {
    if (!resendOtpData.error && resendOtpData.statusCode === 200) {
      toast.success(`${resendOtpData.message}, Kindly check email for new OTP`);
    } else if (resendOtpData.error) {
      toast.error(resendOtpData.message);
    }
    setTimeout(()=>{
    dispatch(resetResendOtpState())

    },2000)
  }, [dispatch, resendOtpData.error, resendOtpData.message, resendOtpData.statusCode]);
  return (
    <div>
      <AuthLayout>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex gap-2 items-center">
            <Heading
              size="xl"
              weight="bold"
              color="default"
              className="text-2xl"
            >
              Verify Your Email
            </Heading>
          </div>
          <Text size="sm" weight="medium" color="subtle">
            Enter the 6-digit code sent to your email
          </Text>
        </div>

        <div className="flex  justify-center gap-2 my-4">
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-md text-xl focus:outline-primary"
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          loading={loading}
  className={`w-full ${!isOtpComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!isOtpComplete}
        >
          Verify
        </Button>

        <p className="text-sm text-center mt-4">
          Didn&apos;t receive a code?{" "}
          {resendOtpData.loading ? (
            <span className="text-green-500">Sending...</span>
          ) : (
            <button
              type="button"
              className="text-primary font-medium"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          )}
        </p>
      </AuthLayout>
    </div>
  );
};

export default VerificationService;
