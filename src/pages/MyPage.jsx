import Layout from "../components/frame/Layout.jsx";
import Header from "../components/frame/Header.jsx";
import Lottie from "lottie-react";
import animation from "../assets/Animation.json";
import DonutChart from "../components/mypage/DonutChart";
import { useState } from "react";

const MyPage = () => {
  const system = true;
  return (
    <Layout>
      <Header title={"마이페이지"} system={system} />
      <section className="flex flex-col mt-20 h-full">
        <div className="w-full relative  flex flex-row items-center space-x-5 bg-white/80 px-4 py-3">
          <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl flex items-center justify-center z-10">
            <Lottie animationData={animation} className="w-20 h-20" />
          </div>

          <div className="text-gray-800 font-semibold text-base text-left">
            <span className="text-[#034AA6] font-bold">강대훈</span>님 현재
            관심사 그래프입니다!
          </div>
        </div>
        <div className="mx-4 my-6 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200">
          <DonutChart />
        </div>
      </section>
    </Layout>
  );
};

export default MyPage;
