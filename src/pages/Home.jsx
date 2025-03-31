import { useEffect, useState } from "react";
import { getData } from "../util/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainHeader from "../components/MainHeader";
export const Home = () => {
  const nav = useNavigate();

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();

        if (res.status === 200) {
          setData(res.data);
          console.log(res.data.massage);
        }
      } catch (error) {
        alert("접근 불가! 로그인하세요");
        nav("/", { replace: true });
      }
    };
    fetchData();
  }, [nav]);
  return (
    <Layout>
      <MainHeader />
      <div className="bg-[#034AA6] min-h-screen ">
        <div className="bg-white rounded-t-3xl mt-20 p-4 min-h-[calc(100vh-5rem)] flex flex-col space-y-3">
          <div className="border rounded-lg border-slate-700 min-h-48">
            container
          </div>
          <div className="border rounded-lg border-slate-700 min-h-48">
            container
          </div>
          <div className="border rounded-lg border-slate-700 min-h-48">
            container
          </div>
          <div className="border rounded-lg border-slate-700 min-h-48">
            container
          </div>
          <div className="border rounded-lg border-slate-700 min-h-48">
            container
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
