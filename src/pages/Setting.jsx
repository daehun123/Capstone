import Header from "../components/Header";
import Layout from "../components/Layout";

const Setting = () => {
  return (
    <Layout>
      <Header title={"설정"} />
      <section>
        <div>이메일 설정</div>
        <div>탈퇴하기</div>
      </section>
    </Layout>
  );
};

export default Setting;
