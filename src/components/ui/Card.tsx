import Tag from "./Tag";
import TimeTag from "./TimeTag";

interface CardProps {
  title: string;
  price: string;
  image: string;

  tagLabel: string;
  tagVariant?: "outbid" | "winning" | "in-progress" | "done";

  timeLabel: string;
  timeVariant?: "last24h" | "default";

  variant?: "default" | "editable";

  onEdit?: () => void;
  onDelete?: () => void;
}

function Card({
  title,
  price,
  image,
  tagVariant = "outbid",
  timeLabel,
  timeVariant,
  variant = "default",
  onEdit,
  onDelete,
}: CardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl w-[216px] overflow-hidden font-sans">

      <div className="flex flex-col gap-2 px-2 pt-2 pb-1 w-full">

        <div className="flex justify-between items-center w-full">
          <Tag variant={tagVariant} />

          <TimeTag
            time={timeLabel}
            variant={timeVariant}
          />
        </div>


        <p className="text-[#071015] text-[16px] leading-6 font-light truncate font-sans">
          {title}
        </p>

        <p className="text-[#071015] text-[16px] leading-6 font-medium font-sans">
          {price}
        </p>
      </div>

      <div className="px-1 pb-1">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] object-cover rounded-xl"
        />
      </div>

      {variant === "editable" && (
        <div className="flex gap-1 px-1 pb-2">

          <button
            onClick={onDelete}
            className="w-12 h-10 border border-[#272D2D] rounded-2xl flex items-center justify-center hover:bg-gray-100 transition"
          >
            🗑
          </button>

          <button
            onClick={onEdit}
            className="flex-1 h-10 bg-[#272D2D] text-white rounded-2xl hover:opacity-90 transition"
          >
            Edit
          </button>

        </div>
      )}
    </div>
  );
}

export default Card;