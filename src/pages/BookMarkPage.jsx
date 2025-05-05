import BookMarkPageGrid from "../components/bookmarkpage/bookmarkgrid";
import Header from "../components/frame/Header";
import Layout from "../components/frame/Layout";
import useBookMarkItemStore from "../store/useBookMarkItemStore";

export const BookMarkPage = () => {
  const setItem = useBookMarkItemStore.getState().setItem;
  setItem([
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
  ]);

  return (
    <Layout>
      <Header title="북마크" />
      <main className="w-full min-h-screen p-4 mt-20">
        <BookMarkPageGrid />
      </main>
    </Layout>
  );
};

export default BookMarkPage;
