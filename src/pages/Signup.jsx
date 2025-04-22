import { useNavigate } from "react-router-dom";
import SignupForm from "../components/firstpage/SignupForm";
import Layout from "../components/frame/Layout.jsx";
import Header from "../components/frame/Header.jsx";
export const Signup = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <Header title={"회원가입"} />
      <div className="p-4 flex flex-col space-y-6 mt-20 mx-6">
        <h1 className="font-extrabold text-4xl">회원가입</h1>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
