import { useUser } from "../../hooks/useUser";
import Tag from "./Tagv2";
import TimeTag from "./TimeTag";
import type { Auction } from "../../types/Auction";
import { formatTime } from "../../utils/formatTime";
import { getTimeVariant } from "../../utils/timeVariant";
import { formatMoney } from "../../utils/formatMoney";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "./Icon";

interface CardProps {
  a: Auction;
  variant?: "default" | "editable" | "done";
  onDelete?: () => void;
}

function Card({ a, variant = "default", onDelete }: CardProps) {
  const navigate = useNavigate();
  const user = useUser();
  const userId = user?.id;

  const auctionId = a.id;

  const title = a.title;
  const price = a.currentPrice;
  const image = a.image;
  const time = a.endDate;
  const highestBidder = a.bids?.[0]?.userId;
  const hasBid = a.hasBid;
  const status = a.status;

  if(variant == "editable" && status == "ENDED"){
    variant = "done";
  }

  let tag: "InProgress" | "Outbid" | "Winning" | "Done";

  if (status === "ENDED") tag = "Done";
  else if (highestBidder === userId) tag = "Winning";
  else if (hasBid) tag = "Outbid";
  else tag = "InProgress";

  return (
    <div className="flex flex-col bg-white rounded-2xl w-[216px] overflow-hidden font-sans">

      <div className="flex flex-col gap-2 px-2 pt-2 pb-1 w-full">

        <div className="flex justify-between items-center w-full">
          <Tag variant={tag} />
          <TimeTag
            time={formatTime(time)}
            variant={getTimeVariant(time)}
          />
        </div>

        <p className="text-[#071015] text-[16px] leading-6 font-light truncate">
          {title}
        </p>

        <p className="text-[#071015] text-[16px] leading-6 font-medium">
          {formatMoney(price)}
        </p>
      </div>

      <div className="px-1 pb-1">
        <img
          src={image || "/placeholder_auction.png"}
          alt={title}
          className="w-full h-[150px] object-cover rounded-xl"
        />
      </div>

      {variant === "editable" && (
        <div className="flex gap-1 px-1 pb-2">

          <button
            onClick={onDelete}
            className="w-12 h-10 border border-[#272D2D] rounded-2xl flex items-center justify-center"
          >
            <DeleteIcon className="shrink-0" />
          </button>

          <button
            onClick={() => navigate(`/edit-auction/${auctionId}`)}
            className="flex-1 h-10 bg-[#272D2D] text-white rounded-2xl"
          >
            Edit
          </button>

        </div>
      )}

      {variant === "done" && (
      <div className="flex justify-center items-center px-1 pb-2 w-full">
        <button
          onClick={onDelete}
          className="w-12 h-10 border border-[#272D2D] rounded-2xl flex items-center justify-center"
        >
          <DeleteIcon className="shrink-0" />
        </button>
      </div>
)}
    </div>
  );
}

export default Card;