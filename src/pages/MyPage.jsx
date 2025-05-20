import Layout from "../components/frame/Layout.jsx";
import Header from "../components/frame/Header.jsx";
import Lottie from "lottie-react";
import animation from "../assets/Animation.json";
import DonutChart from "../components/mypage/DonutChart";
import useUserDataStore from "../store/useUserDataStore.js";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.4 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.4 },
  }),
};

const MyPage = () => {
  const system = true;
  const { info } = useUserDataStore();
  const [isChange, setIsChange] = useState(true);
  const toggleHandler = () => {
    setIsChange(!isChange);
  };
  return (
    <Layout>
      <Header title={"마이페이지"} system={system} />
      <section className="flex flex-col mt-20 h-full">
        <div className="w-full relative  flex flex-row items-center space-x-5 bg-white/80 px-4 py-3">
          <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl flex items-center justify-center z-10">
            <Lottie animationData={animation} className="w-20 h-20" />
          </div>

          <div className="text-gray-800 font-semibold text-base text-left">
            <span className="text-[#034AA6] font-bold">{info.name}</span>님의
            현재 관심사 그래프입니다!
          </div>
        </div>

        <div className="relative mx-4 my-6 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-h-[563px]">
          <AnimatePresence mode="wait" custom={isChange ? 1 : -1}>
            <motion.div
              key={isChange ? "product" : "place"}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={isChange ? 1 : -1}
            >
              {isChange ? (
                <DonutChart item={"상품"} />
              ) : (
                <DonutChart item={"장소"} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-6">
          <div className="flex bg-gray-100 rounded-full p-1 shadow-inner">
            <button
              onClick={() => toggleHandler(true)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                isChange ? "bg-white shadow text-black" : "text-gray-400"
              }`}
            >
              상품
            </button>
            <button
              onClick={() => toggleHandler(false)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                !isChange ? "bg-white shadow text-black" : "text-gray-400"
              }`}
            >
              장소
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyPage;
