import Layout from "../components/frame/Layout.jsx";
import { useNavigate } from "react-router-dom";
import nlogin_btn from "../assets/btnG_축약형.png";
import klogin_btn from "../assets/kakao_login_large.png";
import AnimationLogo from "../components/firstpage/AnimationLogo";
import { KAKAO_AUTH_URL } from "../util/outh/kakao.js";
import { NAVER_AUTH_URL } from "../util/outh/naver.js";

const FirstPage = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="relative h-screen">
        <AnimationLogo />
        <div className="flex flex-col space-y-3 px-3 absolute bottom-1 w-full">
          <button
            onClick={() => nav("/login")}
            className="border rounded-xl  min-w-full min-h-12 text-white bg-[#034AA6] hover:bg-[#2A5CBF] font-bold"
          >
            로그인
          </button>
          <button
            onClick={() => nav("/signup")}
            className="border rounded-xl min-w-full min-h-12 text-[#034AA6] border-[#034AA6] font-bold"
          >
            가입하기
          </button>
          <div className="flex justify-center space-x-3">
            <a href={NAVER_AUTH_URL}>
              <img
                src={nlogin_btn}
                className="cursor-pointer max-h-12 rounded-lg"
              />
            </a>

            <a href={KAKAO_AUTH_URL}>
              <img
                src={klogin_btn}
                className="cursor-pointer max-h-12 rounded-lg"
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstPage;
