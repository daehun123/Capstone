import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import main_logo from "../../assets/main_logo.png";
import google_logo from "../../assets/구글 로고.png";
import naver_logo from "../../assets/네이버 로고.png";
import musinsa_logo from "../../assets/무신사 로고.png";
import cupang_logo from "../../assets/쿠팡 로고.png";

const AnimationLogo = () => {
  const logos = [google_logo, musinsa_logo, naver_logo, cupang_logo];
  const logo_w = [40, 120, 50, 120];
  const logo_h = [40, 20, 50, 30];
  const logo_t = [100, 130, 350, 350];
  const logo_l = [100, 230, 300, 90];

  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldExit(true);
    }, 1300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative mt-10 mx-auto w-full max-w-l  h-[500px]">
      {/* 메인 로고 */}
      <motion.img
        src={main_logo}
        className="z-50 bg-transparent mx-auto relative"
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", delay: 1, duration: 0.8 }}
      />

      {/* 주변 로고 */}
      <AnimatePresence>
        {logos
          .map((logo, idx) => (
            <motion.img
              key={idx}
              src={logo}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                x: [-100, 100, -150, 150][idx],
                y: [-200, -250, -150, -220][idx],
                rotate: 360,
              }}
              transition={{ duration: 1 }}
              className="absolute"
              style={{
                width: logo_w[idx],
                height: logo_h[idx],
                top: logo_t[idx],
                left: logo_l[idx],
              }}
            />
          ))
          .filter((_, idx) => !shouldExit)}
      </AnimatePresence>
    </div>
  );
};

export default AnimationLogo;
