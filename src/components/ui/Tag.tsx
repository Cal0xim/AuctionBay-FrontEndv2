const variantStyles = {
  Outbid: "bg-[#FFAA98] text-[#071015]",
  Winning: "bg-[#ADFF90] text-[#071015]",
  "InProgress": "bg-[#F9FF90] text-[#071015]",
  Done: "bg-[#272D2D] text-white",
} as const;

type TagVariant = keyof typeof variantStyles;

type TagSize = "default" | "small";

type TagProps = {
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
};

const sizeStyles = {
  default: "h-7 px-2 rounded-2xl text-[16px] leading-6",
  small: "h-4 px-1 rounded-[8px] text-[10px] leading-3",
} as const;

export default function Tag({
  variant = "InProgress",
  size = "default",
  className = "",
}: TagProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        justify-center
        font-light
        whitespace-nowrap
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {variant}
    </div>
  );
}