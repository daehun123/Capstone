import { useEffect, useState } from "react";
import { getData } from "../util/api";
import { useNavigate } from "react-router-dom";

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
  return <div>Home</div>;
};

export default Home;
