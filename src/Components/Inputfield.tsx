import React, { useState } from "react";
import { useField } from "formik";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}



// ...

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const [field, meta] = useField(props.name);
    const hasError = meta.touched && meta.error;
    const baseStyles =
      "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none";
    const errorStyles = hasError
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-[#1E2A47]";

    const iconPadding = leftIcon
      ? "pl-10"
      : rightIcon || type === "password"
      ? "pr-10"
      : "";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id || props.name}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            id={id || props.name}
            ref={ref}
            {...field}
            type={type === "password" && showPassword ? "text" : type}
            className={cn(baseStyles, errorStyles, iconPadding, className)}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute ${
                rightIcon ? "right-8" : "right-3"
              } top-1/2 -translate-y-1/2 text-slate-500 focus:outline-none`}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9.17-3.11-10.71-7.5a10.05 10.05 0 013.024-4.366m3.033-2.071a10.05 10.05 0 0110.71 7.5 9.99 9.99 0 01-.905 1.692M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {rightIcon}
            </div>
          )}
        </div>
        {hasError && <p className="text-sm text-red-600">{meta.error}</p>}
        {helperText && !hasError && (
          <p className="text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
