import { useEffect, useState } from "react";
import { getData } from "../util/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainHeader from "../components/MainHeader";
import ContentSlider from "../components/ContentSlider";
import ContentList from "../components/ContentList";
import ContentModal from "../components/ContentModal";
import YoutubeSlider from "../components/YoutubeSlider";
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

  const [youtubeData, setYoutubeData] = useState([
    {
      id: 1,
      title: "🎁 가격대별 20대 남자 선물 추천 (주우재 추천 아이템도 있음)",
      thumbnail:
        "https://i.ytimg.com/vi/ixvdHY8zJ9Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDA5_tEfrH0rhZumh1piBJRgSGomw",
      link: "",
    },
    {
      id: 2,
      title:
        "🚨 무조건 이 영상 보고 일본가세요🚨 일본여행 필수템부터 / 모르면 돈날리는.. 여행 망치는 것들 / 쇼핑tip / 지역 추천까지‼️",
      thumbnail:
        "https://i.ytimg.com/vi/vi1FoHjIR3Y/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCfjhtS4IcG43OQKBBJCw-97fvYgg",
      link: "",
    },
    {
      id: 3,
      title:
        "🔥≪신병≫ 시즌3🔥드디어 떴다..! 중대로 복귀한 성윤모가 &quot;연예인 후임&quot;과 &quot;개폐급 후임&quot; 신병을  동시에 맞이하면 벌어지는 일 ㄷㄷ ≪신병 시즌3≫ 1-4화 게시자: 지무비 : G Movie 조회수 1,530,941회 5일 전 34분",
      thumbnail:
        "https://i.ytimg.com/vi/5NNfOHXy3yQ/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCeoBDSip4ehHMh9JTM1LWUF88Qww",
      link: "",
    },
    {
      id: 4,
      title: "4년만에 게이밍 미니 PC 바꿨습니다! 컴퓨터는 작을 수록 예쁘다(?)",
      thumbnail:
        "https://i.ytimg.com/vi/iQVz7agtA7E/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAJoY8S7IHx2jZbyQFsqa6DOnP_kg",
      link: "",
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
          <ContentSlider data={data} onItemClick={openModal} />
          <YoutubeSlider data={youtubeData} />
          <ContentList data={data} onItemClick={openModal} />
        </article>
        {setSelectedItem && (
          <ContentModal item={selectedItem} onClose={closeModal} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
