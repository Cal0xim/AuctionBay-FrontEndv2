import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import CTAButton from "./CTA";
import ProfileMenu from "../ui/ProfileMenu";

interface RightNavProps {
  avatarSrc: string;
  onNotify?: () => void;
}

function RightNav({ avatarSrc, onNotify }: RightNavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 p-1 bg-white rounded-full w-fit">
      <CTAButton
        variant="primary"
        onClick={() => (window.location.href = "/create")}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
          </svg>
        }
      />

      <div className="relative" ref={menuRef}>
        <button onClick={() => setOpen(true)}>
          <Avatar src={avatarSrc} size="large" />
        </button>

        {open && <ProfileMenu onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}

export default RightNav;