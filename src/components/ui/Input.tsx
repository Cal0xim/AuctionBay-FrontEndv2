type InputState = "default" | "hover" | "active" | "filled";

type InputProps = {
  label?: string;
  value: string;
  placeholder?: string;
  state?: InputState;
  type?: string;
  className?: string;
  onChange: (value: string) => void;
};

const stateStyles: Record<InputState, string> = {
  default: "border-[#DDE9E6]",
  hover: "border-[#B0BFBD]",
  active: "border-[#F4FF47]",
  filled: "border-[#DDE9E6] text-[#071015] font-medium",
};

export default function Input({
  label,
  value,
  placeholder,
  state = "default",
  type = "text",
  className = "",
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[#071015] text-base font-light">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full h-10 px-4 py-2
          rounded-2xl border
          bg-white
          text-[#071015]
          text-base font-light
          outline-none
          transition
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          ${stateStyles[state]}
          focus:border-[#F4FF47]
          ${className}
        `}
      />
    </div>
  );
}