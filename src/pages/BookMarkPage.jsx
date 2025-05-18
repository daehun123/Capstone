import { useEffect } from "react";
import BookMarkPageGrid from "../components/bookmarkpage/BookMarkGrid";
import Header from "../components/frame/Header";
import Layout from "../components/frame/Layout";
import useBookMarkItemStore from "../store/useBookMarkItemStore";
import useContentDataStore from "../store/useContentDataStore";
import { getBookMarkList } from "../util/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const BookMarkPage = () => {
  const setItem = useBookMarkItemStore.getState().setItem;
  const getDeleteTarget = useBookMarkItemStore.getState().getUnmarkedIds;
  const deleteBookmark = useBookMarkItemStore.getState().deleteBookmark;
  // const batchUnmark = useContentDataStore.getState().batchUnmark;
  const nav = useNavigate();
  useEffect(() => {
    const getBookMarkData = async () => {
      try {
        const res = await getBookMarkList();
        if (res.status === 200) {
          setItem(res.data.data.contents);
        }
      } catch (error) {
        toast.error("토큰 만료");
        nav("/", { replace: true });
      }
    };
    getBookMarkData();

    return () => {
      const ids = getDeleteTarget();
      deleteBookmark(ids);
      // batchUnmark(ids);
    };
  }, []);

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
