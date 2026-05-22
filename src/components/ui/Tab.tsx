type TabItem = {
  label: string;
};

type TabProps = {
  tabs: TabItem[];
  activeIndex?: number;
  className?: string;
  onChange?: (index: number) => void;
};

export default function Tab({
  tabs,
  activeIndex = 0,
  className = "",
  onChange,
}: TabProps) {
  return (
    <div
      className={`
        inline-flex items-start
        p-1 gap-2
        bg-[#EDF4F2]
        rounded-2xl
        ${className}
      `}
    >
      {tabs.map((tab, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={index}
            onClick={() => onChange?.(index)}
            className={`
              flex justify-center items-center
              px-4 py-2 gap-2
              min-h-[40px]
              rounded-2xl
              text-base font-medium
              transition
              ${
                active
                  ? "bg-[#272D2D] text-white"
                  : "bg-[#EDF4F2] text-[#071015]"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}