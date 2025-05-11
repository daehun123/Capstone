import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../util/api";
import Layout from "../components/frame/Layout.jsx";
import Header from "../components/frame/Header.jsx";
import { toast } from "react-toastify";

export const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res.status === 200) {
        nav("/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("이메일, 비밀번호가 틀렸습니다.");
      } else {
        toast.error("존재하지 않는 회원입니다.");
      }
    }
  };
  return (
    <Layout>
      <Header title={"로그인"} />

      <div className="p-4 flex flex-col space-y-6 mt-28 mx-6">
        <h1 className="font-extrabold text-4xl">로그인</h1>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 leading-9"
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          className="border-b-2 leading-9"
        />

        <div>
          <button
            onClick={handleLogin}
            className="border rounded-xl  min-w-full min-h-16 text-white bg-[#034AA6] hover:bg-[#2A5CBF] font-bold mt-10"
          >
            로그인
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
