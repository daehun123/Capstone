import logo from "../assets/main_logo_반전.png";
import { House } from "lucide-react";

const MainHeader = () => {
  return (
    <header className="bg-[#034AA6] h-20 flex justify-center items-center px-4 pt-2 relative">
      <div className="h-14 w-40 overflow-hidden ">
        <img src={logo} alt="logo" className="h-full w-full object-cover" />
      </div>
      <House className="text-white absolute right-4" />
    </header>
  );
};

export default MainHeader;
