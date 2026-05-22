import { useUser } from "../../utils/UserContext";

import LeftNav from "./LeftNav";
import NavTab from "./NavTab";
import RightNav from "./RightNav";

type NavBarProps = {
  activeTab: "left" | "right";
};

function NavBar({ activeTab }: NavBarProps) {
  const { user } = useUser();

  return (
    <div className="w-full h-[104px] flex items-center justify-between px-8 py-5 bg-transparent">
      <div className="flex items-center gap-4">
        <LeftNav />
      </div>

      <div className="flex items-center">
        <NavTab active={activeTab} />
      </div>

      <div className="flex items-center">
        <RightNav avatarSrc={user?.image || "/placeholderPFP.png"} />
      </div>
    </div>
  );
}

export default NavBar;