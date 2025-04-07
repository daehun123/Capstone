import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

const Header = ({ title, system }) => {
  const nav = useNavigate();

  return (
    <header className="fixed z-50 w-full gap-3 max-w-md h-20 border-b border-blue-300/50 shadow-sm backdrop-blur-md flex items-center px-4 bg-white">
      <button onClick={() => nav(-1)} className="z-10">
        <ArrowLeft size={28} />
      </button>

      <h1 className="font-bold text-lg">{title}</h1>
      {system === true ? (
        <button className="absolute right-4" onClick={() => nav("/setting")}>
          <Settings size={24} />
        </button>
      ) : null}
    </header>
  );
};

export default Header;
