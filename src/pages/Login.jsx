import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../util/api";

export const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignup = () => {
    nav("/signup");
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      nav("/home");
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div>
      <h2>로그인</h2>
      <div>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>네이버</button>
        <button>카카오톡</button>
      </div>
      <div>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={onClickSignup}>회원가입</button>
      </div>
    </div>
  );
};
