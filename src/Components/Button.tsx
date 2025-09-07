import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
  icon?:React.ReactNode;
  iconPosition?:string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary_dark transform hover:scale-y-105 transition duration-700 ease-in-out focus-visible:ring-slate-900",

      secondary:
        "bg-secondary text-white hover:bg-secondary_dark hover:text-white transform hover:scale-y-105 transition duration-700 ease-in-out focus-visible:ring-slate-500",

      outline:
        "border border-border bg-transparent text-slate-900 hover:bg-slate-100 transform hover:scale-y-105 transition duration-700 ease-in-out focus-visible:ring-slate-500",

      ghost:
        "bg-transparent text-slate-900 hover:bg-slate-100 transform hover:scale-y-105 transition duration-700 ease-in-out focus-visible:ring-slate-500",

      destructive:
        "bg-error text-white hover:bg-error_light transform hover:scale-y-105 transition duration-700 ease-in-out focus-visible:ring-red-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm w-full sm:w-auto", // full width on mobile
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span className={cn(children ? "mr-2" : "")}>{icon}</span>
        )}

        {children}

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <span className={cn(children ? "ml-2" : "")}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
