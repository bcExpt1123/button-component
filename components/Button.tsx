import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

/** Supported button colors */
export type ButtonColor = "dark" | "green";

/** Supported button variants */
export type ButtonVariant = "solid" | "outlined";

export interface ButtonProps {
  /** Determines button color (default is "dark") */
  color?: ButtonColor;
  /** Determines button style (default is "solid") */
  variant?: ButtonVariant;
  /** Button label text */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Base styles applied to all variants */
const BASE_STYLES = "py-2 px-4 rounded";

/**
 * Mapping of styles based on button variants and colors.
 */
const VARIANT_STYLES: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    green: "bg-green-600 text-white hover:bg-green-500",
  },
  outlined: {
    dark: "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
    green: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  },
};

/** Button component */
export const Button: FC<ButtonProps> = ({
  color = "dark",
  variant = "solid",
  label,
  onClick,
}) => {
  /**
   * Dynamically compute the classNames for the button based on its variant and color
   */
  const className = useMemo(() => {
    const variantStyles = VARIANT_STYLES[variant][color];

    return twMerge(BASE_STYLES, variantStyles);
  }, [color, variant]);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};
