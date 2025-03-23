import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

export const Signup = () => {
  const nav = useNavigate();
  return (
    <div>
      <h2>회원가입</h2>
      <SignupForm />
      <button
        onClick={() => {
          nav("/");
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default Signup;
