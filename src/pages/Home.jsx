import { useEffect, useState } from "react";
import { getData } from "../util/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainHeader from "../components/MainHeader";
import ContentSlider from "../components/ContentSlider";
import ContentList from "../components/ContentList";
import ContentModal from "../components/ContentModal";
export const Home = () => {
  const nav = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const [data, setData] = useState([
    {
      id: 1,
      name: "가죽",
      thumbnail:
        "https://gdimg.gmarket.co.kr/2650436896/still/400?ver=1735208261",
      detail: [
        {
          title: "상품 1",
          thumbnail: "",
        },
        {
          title: "상품2",
          thumbnail: "",
        },
        {
          title: "상품3",
          thumbnail: "",
        },
      ],
    },
    {
      id: 2,
      name: "A-2",
      thumbnail:
        "https://coor.kr/web/product/extra/big/202502/2c94e3f34f4e503db3759d3a316c74d1.jpeg",
    },
    {
      id: 3,
      name: "쿄듀로이",
      thumbnail:
        "https://img.29cm.co.kr/next-product/2022/09/16/22c0389d41d04219a9b4f570509f489e_20220916151534.jpg?width=700&format=webp",
    },
    {
      id: 4,
      name: "조거",
      thumbnail:
        "https://item.elandrs.com/r/image/item/2023-11-08/5f90e774-eecb-4890-8869-f00b9250e54a.jpg?w=750&h=&q=100",
    },
    {
      id: 5,
      name: "청바지",
      thumbnail:
        "https://ozkizonline.cafe24.com/ozkiz/wear/p273_wow_point_05.jpg",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();

        if (res.status === 200) {
          //setData(res.data);
        }
      } catch (error) {
        alert("접근 불가! 로그인하세요");
        nav("/", { replace: true });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <MainHeader />
      <main className="bg-[#034AA6] min-h-screen text-center pt-20 flex flex-col">
        <p className="relative top-16 text-white font-semibold text-lg">
          안녕하세요 <span className="text-[#FFD700]">강대훈</span>님 오늘의
          추천이에요!
        </p>
        <article className="bg-white rounded-t-3xl mt-32 p-4 flex flex-col space-y-3 border border-gray-200 flex-grow">
          <ContentSlider data={data} onItemClick={openModal}/>
          <ContentList data={data} onItemClick={openModal}/>
        </article>
        {setSelectedItem && (
          <ContentModal item={selectedItem} onClose={closeModal} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
