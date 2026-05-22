import { HomeIcon } from "./Icon";
import { PersonIcon } from "./Icon";
import { useNavigate } from "react-router-dom";

type NavTabProps = {
  active?: "left" | "right";
  leftLabel?: string;
  rightLabel?: string;
  onChange?: (tab: "left" | "right") => void;
};

export default function NavTab({
  active = "left",
  leftLabel = "Home",
  rightLabel = "Profile",
  onChange,
}: NavTabProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center p-1 gap-2 bg-white rounded-[32px] w-[251px] h-[64px]">

      <button
        onClick={() => {
            navigate("/auctions")
            onChange?.("left");
        }}
        className={`
          flex items-center justify-center gap-1
          px-4 py-2 h-[56px] w-[126px]
          rounded-[32px]
          transition
          ${
            active === "left"
              ? "bg-[#272D2D] text-white"
              : "bg-transparent text-[#071015]"
          }
        `}
      >
        <HomeIcon className="shrink-0" />

        <span className="text-base font-normal">{leftLabel}</span>
      </button>

      <button
        onClick={() => {
             navigate("/my-auctions")
            onChange?.("right");
        }}
        className={`
          flex items-center justify-center gap-1
          px-4 py-2 h-[56px] w-[126px]
          rounded-[32px]
          transition
          ${
            active === "right"
              ? "bg-[#272D2D] text-white"
              : "bg-transparent text-[#071015]"
          }
        `}
      >
        <PersonIcon className="shrink-0" />

        <span className="text-base font-normal">{rightLabel}</span>
      </button>
    </div>
  );
}