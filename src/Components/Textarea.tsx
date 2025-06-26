import React from "react";
import { useField } from "formik";
import { cn } from "../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, id, ...props }, ref) => {
    const [field, meta] = useField(props.name ?? "");
    const hasError = meta.touched && meta.error;
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

      const baseStyles =
        "flex  w-full rounded-md border bg-white px-3 py-2 text-base sm:text-sm placeholder:text-slate-500 focus:outline-none";
      const errorStyles = hasError
        ? "border-red-500 focus:border-red-500"
        : "border-slate-300 focus:border-[#1E2A47]";

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          {...field}
          {...props}
          ref={ref}
          className={cn(baseStyles, errorStyles, className)}
          style={{
            fontSize: "16px",
            WebkitAppearance: "none",
            borderRadius: "6px",
          }}
        />
        {hasError && <p className="text-sm text-red-600">{meta.error}</p>}
        {helperText && !hasError && (
          <p className="text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
