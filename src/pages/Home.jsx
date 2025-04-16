import { useEffect, useState } from "react";
import { getData } from "../util/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainHeader from "../components/MainHeader";
import ContentSlider from "../components/ContentSlider";
import ContentList from "../components/ContentList";
import ContentModal from "../components/ContentModal";
import YoutubeSlider from "../components/YoutubeSlider";
import YoutubeModal from "../components/YoutubeModal";
export const Home = () => {
  const nav = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const openModal = (item) => {
    setSelectedItem(item);
    setSelectType("content");
  };
  const openYModal = (item) => {
    setSelectedItem(item);
    setSelectType("youtube");
  };
  const closeModal = () => {
    setSelectedItem(null);
    setSelectType(null);
  };

  const [data, setData] = useState([
    {
      id: 1,
      mark: true,
      name: "가죽 자켓",
      thumbnail:
        "https://intheraw.co.kr/web/product/tiny/202404/d0b31c6cbe58bfe32934d9e31f61d60f.jpg",
      detail: [
        {
          id: 1,
          title: "[변우석] 남자 에코 레더 자켓(가죽 자켓)",
          thumbnail:
            "https://m.giordano.co.kr/_data/attach/202501/24/3d994806f3ec6c470a29ffd739944f0e.jpg",
          link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.giordano.co.kr%2Fshop%2Fdetail.php%3Fpno%3DB0FACF2D75C12CBD77786A1F5588FD56%26cno1%3D2181&psig=AOvVaw3mjNcV2akHHDDiElwBunmF&ust=1744694062451000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD6k4ri1owDFQAAAAAdAAAAABAE",
        },
        {
          id: 2,
          title: "투웨이 베이직 카라 레더 자켓",
          thumbnail:
            "https://m.byslim.com/web/product/big/202402/8776e20a5f6257e83d6b26c333e5893e.jpg",
          link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.byslim.com%2Fproduct%2F%25ED%2588%25AC%25EC%259B%25A8%25EC%259D%25B4-%25EB%25B2%25A0%25EC%259D%25B4%25EC%25A7%2581-%25EC%25B9%25B4%25EB%259D%25BC-%25EB%25A0%2588%25EB%258D%2594-%25EC%259E%2590%25EC%25BC%2593%2F26538%2F&psig=AOvVaw3mjNcV2akHHDDiElwBunmF&ust=1744694062451000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD6k4ri1owDFQAAAAAdAAAAABAd",
        },
        {
          id: 3,
          title: "아더 크랙 스웨이드 레더자켓 (2color)",
          thumbnail:
            "https://g-room.kr/web/product/big/202310/54432cc7cc20b8afdbfd7b5f3733783f.jpg",
          link: "https://g-room.kr/web/product/big/202310/54432cc7cc20b8afdbfd7b5f3733783f.jpg",
        },
        {
          id: 4,
          title: "보머 절개 워싱 레더 자켓",
          thumbnail:
            "https://haokan.co.kr/web/product/big/202404/34b7fdd266e7b4719be555a794375453.jpg",
          link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhaokan.co.kr%2Fproduct%2F%25EB%25B3%25B4%25EB%25A8%25B8-%25EC%25A0%2588%25EA%25B0%259C-%25EC%259B%258C%25EC%258B%25B1-%25EB%25A0%2588%25EB%258D%2594-%25EC%259E%2590%25EC%25BC%2593%2F9427%2F&psig=AOvVaw2SQ6X9CMwVrztcWy_QFhDe&ust=1744697013407000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiouoDt1owDFQAAAAAdAAAAABAE",
        },
        {
          id: 5,
          title: "오버핏 투웨이 비건레더 자켓 MOOD INSIDE",
          thumbnail:
            "https://maninstore.co.kr/web/product/big/202501/139b4fa4df486d59dda19ac7f0e5de51.jpg",
          link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmaninstore.co.kr%2Fproduct%2Fdetail.html%3Fproduct_no%3D6447&psig=AOvVaw2SQ6X9CMwVrztcWy_QFhDe&ust=1744697013407000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiouoDt1owDFQAAAAAdAAAAABAT",
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
      link: "https://www.youtube.com/watch?v=ixvdHY8zJ9Q",
      description:
        "✅ 키링: 취향 저격 아이템\n✅ 포마드: 향기 좋고 세정 쉬움\n✅ 코도반 슈즈: 고급 가죽 + 편안함\n✅ 수건/속옷: 실용성 갑\n✅ 맥세이프 보조배터리: 디자인 + 기능\n✅ 지갑/액세서리: 브랜드 인지 + 자주 착용\n✅ 상품권: 실패 없는 안전한 선택",
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
          <YoutubeSlider data={youtubeData} onItemClick={openYModal} />
          <ContentList data={data} onItemClick={openModal} />
        </article>
        {setSelectedItem && selectType === "content" && (
          <ContentModal item={selectedItem} onClose={closeModal} />
        )}
        {setSelectedItem && selectType === "youtube" && (
          <YoutubeModal item={selectedItem} onClose={closeModal} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
