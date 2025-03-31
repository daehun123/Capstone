import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Header = ({ title }) => {
  const nav = useNavigate();

  return (
    <header className="relative h-20 border-b-2 border-[#034AA6] flex items-center px-4">
      <button onClick={() => nav(-1)} className="z-10">
        <ArrowLeft size={28} />
      </button>

      <h1 className="absolute left-1/4 -translate-x-1/2 text-xl font-bold">
        {title}
      </h1>
    </header>
  );
};

export default Header;
