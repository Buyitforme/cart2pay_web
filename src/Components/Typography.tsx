import React from "react";
import { cn } from "../lib/utils";

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?:
    | "default"
    | "muted"
    | "subtle"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | string;
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as: Component = "h1",
      size = "lg",
      weight = "semibold",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    };

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const predefinedColors = {
      default: "text-accent",
      muted: "text-slate-600",
      subtle: "text-slate-500",
      primary: "text-primary",
      secondary: "text-purple-600",
      success: "text-green-600",
      warning: "text-amber-600",
      error: "text-red-600",
    };

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor ? predefinedColors[color as keyof typeof predefinedColors] : "";

    return (
      <Component
        ref={ref}
        className={cn(
          "font-heading",
          sizes[size],
          weights[weight],
          colorClass,
          className
        )}
        style={{
          ...(isPredefinedColor ? {} : { color }),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?:
    | "default"
    | "muted"
    | "subtle"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | string;
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      as: Component = "p",
      size = "md",
      weight = "normal",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-2xl",
    };

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const predefinedColors = {
      default: "text-accent",
      muted: "text-slate-600",
      subtle: "text-slate-500",
      primary: "text-primary",
      secondary: "text-purple-600",
      success: "text-green-600",
      warning: "text-amber-600",
      error: "text-red-600",
    };

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor ? predefinedColors[color as keyof typeof predefinedColors] : "";

    return (
      <Component
        ref={ref}
        className={cn(
          "font-body",
          sizes[size],
          weights[weight],
          colorClass,
          className
        )}
        style={{
          ...(isPredefinedColor ? {} : { color }),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | string;
  children: React.ReactNode;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, color = "default", children, ...props }, ref) => {
    const predefinedColors = {
      default: "text-accent bg-slate-100",
      primary: "text-primary",
      secondary: "text-purple-900 bg-purple-100",
      success: "text-green-900 bg-green-100",
      warning: "text-amber-900 bg-amber-100",
      error: "text-red-900 bg-red-100",
    };

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor ? predefinedColors[color as keyof typeof predefinedColors] : "";

    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          colorClass,
          className
        )}
        style={{
          ...(isPredefinedColor ? {} : { color, backgroundColor: `${color}20` }),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = "Code";

export { Heading, Text, Code };
