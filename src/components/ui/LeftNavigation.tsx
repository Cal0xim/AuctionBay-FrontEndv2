import Logo from "./Logo";

export default function LeftNavigation() {
  return (
    <div
      className="
        w-16 h-16
        flex items-start
        p-4
        gap-4
        bg-[#F4FF47]
        rounded-full
      "
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
}