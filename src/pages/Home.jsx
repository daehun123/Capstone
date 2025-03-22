import { useEffect, useState } from "react";
import { getData } from "../util/api";

export const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setData(response.data);
      } catch (error) {
        alert("접근 불가! 로그인하세요");
      }
    };
    fetchData();
  }, []);
  return <div>Home</div>;
};

export default Home;
