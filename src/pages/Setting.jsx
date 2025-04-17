import Header from "../components/Header";
import Layout from "../components/Layout";
import { onDeleteAccount } from "../util/api";

const Setting = () => {
  return (
    <Layout>
      <Header title={"설정"} />
      <section className="w-full min-h-svh p-4 pt-20 flex flex-col justify-between ">
        <div>
          <button className="w-full h-16 p-4 text-start border-b-2">
            이메일 설정
          </button>
          <button className="w-full h-16 p-4 text-start border-b-2">
            비밀번호 변경
          </button>
        </div>
        <button
          className="w-full h-16 bg-red-500 text-white border rounded-xl"
          onClick={onDeleteAccount()}
        >
          탈퇴하기
        </button>
      </section>
    </Layout>
  );
};

export default Setting;
