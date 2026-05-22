type TagVariant =
  | "outbid"
  | "winning"
  | "in-progress"
  | "done";

type TagSize = "default" | "small";

type TagProps = {
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
};

const variantStyles: Record<TagVariant, string> = {
  outbid: "bg-[#FFAA98] text-[#071015]",
  winning: "bg-[#ADFF90] text-[#071015]",
  "in-progress": "bg-[#F9FF90] text-[#071015]",
  done: "bg-[#272D2D] text-white",
};

const sizeStyles: Record<TagSize, string> = {
  default: "h-7 px-2 rounded-2xl text-[16px] leading-6",
  small: "h-4 px-1 rounded-[8px] text-[10px] leading-3",
};

const userId = Number(localStorage.getItem("userId"));

export default function Tag({
  variant = "in-progress",
  size = "default",
  className = "",
}: TagProps) {

  const TagLabel = "in-progress"



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