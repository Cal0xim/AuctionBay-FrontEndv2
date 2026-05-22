import { ClockIcon } from "./Icon";

type TimeTagVariant = "default" | "last24h";
type TimeTagSize = "default" | "small";

type TimeTagProps = {
  time: string;
  variant?: TimeTagVariant;
  size?: TimeTagSize;
  className?: string;
};

const variantStyles: Record<TimeTagVariant, string> = {
  default: "bg-transparent text-[#071015]",
  last24h: "bg-[#FFAA98] text-[#071015]"
};

const sizeStyles: Record<TimeTagSize, string> = {
  default: "h-7 px-2 rounded-2xl text-[16px] leading-6 gap-1",
  small: "h-4 px-1 rounded-[8px] text-[10px] leading-3 gap-1",
};

export default function TimeTag({
  time,
  variant = "default",
  size = "default",
  className = "",
}: TimeTagProps) {
  const iconSize = size === "small" ? 12 : 16;
  if(time == ""){return}
  return (
    <div
      className={`
        inline-flex
        items-center
        justify-center
        gap-1
        font-light
        whitespace-nowrap
        font-sans
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      <span className="leading-none">
        {time ?? ""}
      </span>

      <ClockIcon size={iconSize} className="shrink-0" />
      
    </div>
  );
}