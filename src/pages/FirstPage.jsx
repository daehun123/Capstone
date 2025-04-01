import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import nlogin_btn from "../assets/btnG_축약형.png";
import klogin_btn from "../assets/kakao_login_large.png";
import AnimationLogo from "../components/AnimationLogo";

const FirstPage = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div>
        <AnimationLogo />
        <div className="flex flex-col space-y-3  mx-5 pt-10">
          <button
            onClick={() => nav("/login")}
            className="border rounded-xl  min-w-full min-h-12 text-white bg-[#034AA6] hover:bg-[#2A5CBF] font-bold"
          >
            로그인
          </button>
          <button
            onClick={() => nav("signup")}
            className="border rounded-xl min-w-full min-h-12 text-[#034AA6] border-[#034AA6] font-bold"
          >
            가입하기
          </button>
          <div className="flex justify-center space-x-3">
            <img
              src={nlogin_btn}
              className="cursor-pointer max-h-12 rounded-lg"
            />
            <img
              src={klogin_btn}
              className="cursor-pointer max-h-12 rounded-lg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstPage;
