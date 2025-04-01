import main_logo from "../assets/main_logo.png";
import { AnimatePresence, motion } from "framer-motion";
import google_logo from "../assets/구글 로고.png";
import naver_logo from "../assets/네이버 로고.png";
import musinsa_logo from "../assets/무신사 로고.png";
import cupang_logo from "../assets/쿠팡 로고.png";

const AnimationLogo = () => {
  return (
    <div className="mt-10 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-l">
      <img src={main_logo} className="z-50 bg-transparent" />
      <img src={google_logo} className="absolute max-h-10 top-20 " />
    </div>
  );
};

export default AnimationLogo;
