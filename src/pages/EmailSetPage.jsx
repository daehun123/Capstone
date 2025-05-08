import { useEffect, useState } from "react";
import Header from "../components/frame/Header.jsx";
import Layout from "../components/frame/Layout.jsx";
import { getEmail, onChangeEmail, onDeleteEmail } from "../util/api.js";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const EmailSetPage = () => {
  const [mainemail, setMainEmail] = useState("");
  const [emailgroup, setEmailGroup] = useState([]);
  const [oldemailgroup, setOldEmailGroup] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const res = await getEmail();
        if (res.status === 200) {
          setMainEmail(res.data.data.user_email);
          const formatted = (res.data.data.email_list || []).map((item) => ({
            id: uuidv4(),
            connection_email: item.connection_email,
          }));
          setEmailGroup(formatted);
          setOldEmailGroup(JSON.parse(JSON.stringify(formatted)));
        }
      } catch (error) {
        // alert("토큰 만료 재로그인해주세요.");
        // nav("/", { replace: true });
        console.log(error);
      }
    };
    fetchEmailData();
  }, []);

  const handleChangeEmail = (id, value) => {
    setEmailGroup((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connection_email: value } : item
      )
    );
  };

  const handleUpdateEmail = async (oldemail, newemail) => {
    try {
      const res = await onChangeEmail(oldemail, newemail);
      if (res.status === 200) {
        alert("수정 완료");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("수정 실패 재시도 해주세요");
      } else if (error.status === 403) {
        alert("토큰 만료");
        nav("/", { replace: true });
      }
    }
  };
  const handleDeleteEmail = async (email, id) => {
    try {
      const res = await onDeleteEmail(email);
      if (res.status === 200) {
        setEmailGroup((prev) => prev.filter((e) => e.id !== id));
        console.log("삭제 완료");
      }
    } catch (error) {
      alert("토큰 만료 재로그인해주세요.");
      nav("/", { replace: true });
    }
  };

  return (
    <Layout>
      <Header title={"이메일 설정"} />
      <main className="mt-20 flex flex-col gap-5 p-4 items-center">
        <div className="flex w-full h-14 items-center justify-center text-gray-400 border-2 border-black rounded-lg">
          {mainemail}
        </div>
        {emailgroup.map((item) => (
          <figure
            id={item.id}
            className="flex flex-row w-full justify-between px-2"
          >
            <input
              value={item.connection_email}
              onChange={(e) => handleChangeEmail(item.id, e.target.value)}
              className="w-3/4 text-center"
            ></input>
            <button
              className="border-2 w-14"
              onClick={() => {
                const old = oldemailgroup.find(
                  (e) => e.id === item.id
                )?.connection_email;
                handleUpdateEmail(old, item.connection_email);
              }}
            >
              수정
            </button>
            <button
              className="border-2 w-14"
              onClick={() => handleDeleteEmail(item.connection_email, item.id)}
            >
              삭제
            </button>
          </figure>
        ))}

        <button className="w-full h-10 bg-gray-300 rounded-lg">+</button>
      </main>
    </Layout>
  );
};

export default EmailSetPage;
