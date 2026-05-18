import React from "react";

type Variant = "primary" | "secondary" | "alternative";
type State = "default" | "pressed";

type CTAButtonProps = {
  variant?: Variant;
  state?: State;
  icon: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "flex items-center justify-center w-14 h-14 p-4 rounded-[32px] transition active:scale-95";

const styles: Record<Variant, Record<State, string>> = {
  primary: {
    default: "bg-[#F4FF47] text-[#071015] hover:bg-[#D0DB33]",
    pressed: "bg-[#ACB723] text-[#071015]",
  },

  secondary: {
    default: "bg-[#272D2D] text-white hover:bg-[#1C2526]",
    pressed: "bg-[#131E20] text-white",
  },

  alternative: {
    default: "bg-[#EDF4F2] text-[#071015] hover:bg-[#DDE9E6]",
    pressed: "bg-[#B0BFBD] text-[#071015]",
  },
};

export default function CTAButton({
  variant = "primary",
  state = "default",
  icon,
  className = "",
  ...props
}: CTAButtonProps) {
  return (
    <button
      className={`${base} ${styles[variant][state]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}