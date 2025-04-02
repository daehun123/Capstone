import Layout from "../components/Layout";
import Header from "../components/Header";
import Lottie from "lottie-react";
import animation from "../assets/Animation.json";
import DonutChart from "../components/DonutChart";

const MyPage = () => {
  return (
    <Layout>
      <Header title={"마이페이지"} />
      <div className="flex flex-col">
        <div className="w-full relative  flex flex-row items-center space-x-5 bg-white/80 px-4 py-3">
          <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl flex items-center justify-center z-10">
            <Lottie animationData={animation} className="w-20 h-20" />
          </div>

          <div className="text-gray-800 font-semibold text-base text-left">
            <span className="text-[#034AA6] font-bold">강대훈</span>님 현재
            관심사 그래프입니다!
          </div>
        </div>
        <div className="flex justify-center">
          <DonutChart />
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
