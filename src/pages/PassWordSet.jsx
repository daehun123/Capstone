import { useState } from "react";
import Header from "../components/frame/Header.jsx";
import Layout from "../components/frame/Layout.jsx";
import { onChangePassWord } from "../util/api.js";
import { replace, useNavigate } from "react-router-dom";

const PassWordSet = () => {
  const [oldpw, setOldPw] = useState("");
  const [newpw, setNewPw] = useState("");
  const nav = useNavigate();
  const onChangeHandler = async () => {
    if (!oldpw || !newpw) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (oldpw === newpw) {
      alert("기존 비밀번호와 새 비밀번호가 같습니다.");
      return;
    }

    if (newpw.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    try {
      const res = await onChangePassWord(oldpw, newpw);
      if (res.status === 200) {
        alert("비밀번호 변경 완료!");
        nav("/home", { replace: true });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("기존 비밀번호가 틀렸습니다.");
      } else {
        alert("토큰 만료 재로그인 해주세요.");
      }
    }
  };

  return (
    <Layout>
      <Header title={"비밀번호 변경"} />
      <main className="mt-20 p-4 flex flex-col gap-10 items-center ">
        <section className="mx-5 space-y-5">
          <input
            placeholder="현재 비밀번호 입력"
            className="border-b-2 leading-10 w-full"
            onChange={(e) => setOldPw(e.target.value)}
          />
          <input
            placeholder="변경할 비밀번호 입력"
            className="border-b-2 leading-10 w-full"
            onChange={(e) => setNewPw(e.target.value)}
          />
        </section>
        <button
          className="h-full w-2/3 border-2 rounded-lg min-h-10 text-white bg-[#034AA6] hover:bg-[#2A5CBF] font-semibold"
          onClick={onChangeHandler}
        >
          변경
        </button>
      </main>
    </Layout>
  );
};

export default PassWordSet;
