import { useEffect, useState } from "react";
import { getData, getElseData, getUserData, getYoutubeData } from "../util/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/frame/Layout.jsx";
import MainHeader from "../components/frame/MainHeader";
import ContentSlider from "../components/homepage/ContentSlider";
import ContentList from "../components/homepage/ContentList";
import ContentModal from "../components/homepage/ContentModal";
import YoutubeSlider from "../components/homepage/YoutubeSlider";
import YoutubeModal from "../components/homepage/YoutubeModal";
import useContentDataStore from "../store/useContentDataStore";
import useYoutubeDataStore from "../store/useYoutubeDataStore";
import { toast } from "react-toastify";
import useUserDataStore from "../store/useUserDataStore.js";
import { v4 as uuidv4 } from "uuid";
import ContentSkeleton from "../components/skeleton/ContentSkeleton";
import YoutubeSkeleton from "../components/skeleton/YoutubeSkeleton";
import ContentListSkeleton from "../components/skeleton/ContentListSkeleton.jsx";

export const Home = () => {
  const nav = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const { sendBookmark } = useContentDataStore();
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const openModal = (item) => {
    setSelectedItem(item);
    setSelectType("content");
  };
  const openYModal = (item) => {
    setSelectedItem(item);
    setSelectType("youtube");
  };
  const closeModal = async () => {
    await sendBookmark();
    setSelectedItem(null);
    setSelectType(null);
  };

  useEffect(() => {
    const getUserName = async () => {
      try {
        const res = await getUserData();
        const setInfo = useUserDataStore.getState().setInfo;
        if (res.status === 200) {
          setInfo(res.data.data);
          setUserName(res.data.data.name);
        }
      } catch (error) {
        console.error(error);
        toast.error("접근 불가! 로그인하세요");
        nav("/", { replace: true });
      }
    };

    const fetchData = async () => {
      try {
        const res = await getData();
        const res_else = await getElseData();
        //const res_youtube = await getYoutubeData();
        const setItems = useContentDataStore.getState().setItems;
        const setYItems = useYoutubeDataStore.getState().setItems;
        if (
          res.status === 200 &&
          res_else.status === 200 //&&
          //res_youtube.status === 200
        ) {
          const naverResults = res.data.data?.naver_results;
          const naverPlaces = res.data.data?.naver_places;
          let combinedItems = [];

          if (naverResults) {
            Object.keys(naverResults).forEach((key) => {
              const items = naverResults[key];
              if (Array.isArray(items)) {
                combinedItems = combinedItems.concat(
                  items.map((item) => ({
                    ...item,
                    type: "shopping",
                    groupId: key,
                    id: item.productId || uuidv4(),
                    mark: false,
                  }))
                );
              }
            });
          }

          if (naverPlaces) {
            Object.keys(naverPlaces).forEach((key) => {
              const items = naverPlaces[key];
              if (Array.isArray(items)) {
                combinedItems = combinedItems.concat(
                  items.map((item) => ({
                    ...item,
                    type: "places",
                    groupId: key,
                    id: item.id || uuidv4(),
                    mark: false,
                  }))
                );
              }
            });
          }

          if (combinedItems.length === 0) {
            toast.error("서버에서 유효한 데이터 없음");
            return;
          }

          //setYItems(res_youtube.data.data);
          setItems(combinedItems);
        }
      } catch (error) {
        console.error(error);
        toast.error("데이터 로딩 실패");
        nav("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    getUserName();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <MainHeader />
      <main className="bg-[#034AA6] min-h-screen text-center pt-20 flex flex-col">
        <p className="relative top-16 text-white font-semibold text-lg">
          안녕하세요 <span className="text-[#FFD700]">{username}</span>님 오늘의
          추천이에요!
        </p>
        <article className="bg-white rounded-t-3xl mt-32 p-4 flex flex-col space-y-3 border border-gray-200 flex-grow">
          {loading ? (
            <ContentSkeleton />
          ) : (
            <ContentSlider onItemClick={openModal} />
          )}
          {loading ? (
            <YoutubeSkeleton />
          ) : (
            <YoutubeSlider onItemClick={openYModal} />
          )}

          <section className=" border-t-2 border-gray-200">
            <div className="flex flex-col items-start pl-4 pt-4">
              <p className="font-extrabold text-xl text-[#034AA6]">
                Something Else
              </p>
              <p className="text-gray-500 font-semibold text-sm">
                이런 느낌은 어떨까요?
              </p>
            </div>
            {loading ? (
              <ContentListSkeleton />
            ) : (
              <ContentList onItemClick={openModal} />
            )}
          </section>
        </article>
        {selectedItem && selectType === "content" && (
          <ContentModal item={selectedItem} onClose={closeModal} />
        )}
        {selectedItem && selectType === "youtube" && (
          <YoutubeModal item={selectedItem} onClose={closeModal} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
