import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/frame/Header.jsx";
import Layout from "../components/frame/Layout.jsx";
import { logout, onDeleteAccount } from "../util/api";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

const Setting = () => {
  const nav = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      nav("/", { replace: true });
    }
  }, [isLoggedIn, nav]);

  const handleAccount = async () => {
    try {
      const res = await onDeleteAccount();
      if (res.status === 200) {
        toast.success("탈퇴 완료");
        handleLogout;
      }
    } catch (error) {
      toast.error("토큰 만료");
    }
  };

  return (
    <Layout>
      <Header title={"설정"} />
      <section className="w-full min-h-svh p-4 pt-20 flex flex-col justify-between">
        <div>
          <button
            className="w-full h-16 p-4 text-start border-b-2 font-bold text-lg"
            onClick={() => nav("/emailset")}
          >
            이메일 설정
          </button>
          <button
            className="w-full h-16 p-4 text-start border-b-2 font-bold text-lg"
            onClick={() => nav("/passwordset")}
          >
            비밀번호 변경
          </button>
          <button
            className="w-full h-16 p-4 text-start border-b-2 font-bold text-lg"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <button
          className="w-full h-16 bg-red-500 text-white border rounded-xl text-xl font-semibold"
          onClick={handleAccount}
        >
          탈퇴하기
        </button>
      </section>
    </Layout>
  );
};

export default Setting;
