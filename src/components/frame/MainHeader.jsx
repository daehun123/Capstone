import { useNavigate } from "react-router-dom";
import logo from "../../assets/main_logo_반전.png";
import { House, Star } from "lucide-react";

const MainHeader = () => {
  const nav = useNavigate();
  return (
    <header className="bg-[#034AA6] h-20 w-full max-w-md flex justify-center items-center px-4 pt-2 fixed z-50">
      <div className="h-14 w-40 overflow-hidden ">
        <img src={logo} alt="logo" className="h-full w-full object-cover" />
      </div>
      <figure className="absolute right-4 flex gap-2">
        <Star
          className="text-white cursor-pointer"
          onClick={() => {
            nav("/bookmark");
          }}
        />
        <House
          className="text-white  cursor-pointer"
          onClick={() => nav("/mypage")}
        />
      </figure>
    </header>
  );
};

export default MainHeader;
