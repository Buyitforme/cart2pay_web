import React from "react";
import { cn } from "../lib/utils";

// Heading Component

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | {
        base?:
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | "8xl"
          | "9xl";
        sm?:
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | "8xl"
          | "9xl";
        md?:
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | "8xl"
          | "9xl";
        lg?:
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | "8xl"
          | "9xl";
        xl?:
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "5xl"
          | "6xl"
          | "7xl"
          | "8xl"
          | "9xl";
      };
  weight?: "light" | "extra_light" | "normal" | "medium" | "semibold" | "bold";
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
    const sizeMap = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    };

    // Handle responsive sizes
    const getSizeClasses = () => {
      if (typeof size === "string") {
        return sizeMap[size];
      }

      // Object-based responsive sizes
      const responsiveClasses = [];

      // Base size (mobile-first)
      if (size.base) {
        responsiveClasses.push(sizeMap[size.base]);
      }

      // Responsive breakpoints
      if (size.sm) {
        responsiveClasses.push(`sm:${sizeMap[size.sm]}`);
      }
      if (size.md) {
        responsiveClasses.push(`md:${sizeMap[size.md]}`);
      }
      if (size.lg) {
        responsiveClasses.push(`lg:${sizeMap[size.lg]}`);
      }
      if (size.xl) {
        responsiveClasses.push(`xl:${sizeMap[size.xl]}`);
      }

      return responsiveClasses.join(" ");
    };

    const fontWeights = {
      extra_light: "font-thin", // Changed to Tailwind classes
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const predefinedColors = {
      default: "text-text-primary",
      muted: "text-slate-600",
      subtle: "text-slate-500",
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      success: "text-green-600",
      warning: "text-amber-600",
      error: "text-red-600",
    };

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor
      ? predefinedColors[color as keyof typeof predefinedColors]
      : "";

    const generatedClasses = getSizeClasses();

    return (
      <div className="space-y-4">
        {/* Actual heading */}
        <Component
          ref={ref}
          className={cn(
            generatedClasses,
            fontWeights[weight],
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
      </div>
    );
  }
);

Heading.displayName = "Heading";

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl">;
  weight?:
    | "light"
    | "extra_light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | ResponsiveValue<
        "light" | "extra_light" | "normal" | "medium" | "semibold" | "bold"
      >;
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

type ResponsiveValue<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  [key: string]: T | undefined;
};

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      as: Component = "p",
      size = "md",
      weight = "light",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    const getResponsiveClass = <T extends string>(
      prop: T | ResponsiveValue<T>,
      mapping: Record<T, string>
    ): string => {
      if (typeof prop === "string") {
        return mapping[prop];
      } else {
        return Object.keys(prop)
          .map((breakpoint) => {
            const value = prop[breakpoint as keyof typeof prop];
            return breakpoint === "base"
              ? mapping[value as T]
              : `${breakpoint}:${mapping[value as T]}`;
          })
          .join(" ");
      }
    };

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

  
    const fontWeights = {
      extra_light: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const predefinedColors = {
      default: "text-accent",
      muted: "text-slate-600",
      subtle: "text-slate-500",
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      success: "text-green-600",
      warning: "text-amber-600",
      error: "text-red-600",
      white: "text-decoration-sky-500",
    };
    const sizeClass = getResponsiveClass(size, sizes);
    const weightStyle = getResponsiveClass(weight, fontWeights);

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor
      ? predefinedColors[color as keyof typeof predefinedColors]
      : "";

    return (
      <Component
        ref={ref}
        className={cn(sizeClass, weightStyle, colorClass, className)}
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
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      success: "text-green-900 bg-green-100",
      warning: "text-amber-900 bg-amber-100",
      error: "text-red-900 bg-red-100",
    };

    const isPredefinedColor = color in predefinedColors;
    const colorClass = isPredefinedColor
      ? predefinedColors[color as keyof typeof predefinedColors]
      : "";

    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          colorClass,
          className
        )}
        style={{
          ...(isPredefinedColor
            ? {}
            : { color, backgroundColor: `${color}20` }),
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
