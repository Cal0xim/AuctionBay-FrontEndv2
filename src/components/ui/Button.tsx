import React from "react";

type Variant = "primary" | "secondary" | "tertiary";
type State = "default" | "pressed";

type ButtonProps = {
  variant?: Variant;
  state?: State;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "flex items-center justify-center gap-2 px-4 py-2 h-10 min-h-[40px] rounded-2xl font-medium text-[16px] leading-6 transition select-none";

const styles: Record<Variant, Record<State, string>> = {
  primary: {
    default: "bg-[#F4FF47] text-[#071015]",
    pressed: "bg-[#ACB723] text-[#071015]",
  },
  secondary: {
    default: "bg-[#272D2D] text-white",
    pressed: "bg-[#1C2526] text-white",
  },
  tertiary: {
    default: "bg-transparent border border-[#272D2D] text-[#071015]",
    pressed: "bg-[#131E20] border-[#131E20] text-white",
  },
};

export default function Button({
  variant = "primary",
  state = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${styles[variant][state]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}