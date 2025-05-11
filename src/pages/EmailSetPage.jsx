import { useEffect, useState } from "react";
import Header from "../components/frame/Header.jsx";
import Layout from "../components/frame/Layout.jsx";
import {
  getEmail,
  onAddEmail,
  onChangeEmail,
  onDeleteEmail,
} from "../util/api.js";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CircleX, Mail, Save } from "lucide-react";
import { toast } from "react-toastify";

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
        toast.error("토큰 만료 재로그인해주세요.");
        nav("/", { replace: true });
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

  // const handleUpdateEmail = async (oldemail, newemail) => {
  //   try {
  //     const res = await onChangeEmail(oldemail, newemail);
  //     if (res.status === 200) {
  //       alert("수정 완료");
  //     }
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       alert("수정 실패 재시도 해주세요");
  //     } else if (error.status === 403) {
  //       alert("토큰 만료");
  //       nav("/", { replace: true });
  //     }
  //   }
  // };
  const handleDeleteEmail = async (email, id) => {
    try {
      const res = await onDeleteEmail(email);
      if (res.status === 200) {
        setEmailGroup((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
      toast.error("토큰 만료 재로그인해주세요.");
      nav("/", { replace: true });
    }
  };

  const handleAddEmail = () => {
    setEmailGroup((prev) => [
      ...prev,
      {
        id: uuidv4(),
        connection_email: "",
      },
    ]);
  };

  const handleSyncEmailChanges = async () => {
    const updates = [];
    const additions = [];

    for (let i = 0; i < emailgroup.length; i++) {
      const newEmail = emailgroup[i].connection_email.trim();
      if (!newEmail) continue;

      const oldItem = oldemailgroup.find((e) => e.id === emailgroup[i].id);

      if (oldItem) {
        const oldEmail = oldItem.connection_email.trim();
        if (oldEmail !== newEmail) {
          updates.push({ old: oldEmail, new: newEmail }); // 변경된 기존 이메일
        }
      } else {
        additions.push(newEmail); // 기존에 없던 신규 이메일만 추가
      }
    }

    try {
      for (const u of updates) {
        await onChangeEmail(u.old, u.new);
      }

      if (additions.length > 0) {
        await onAddEmail(additions);
      }

      toast.success("변경 사항 저장 완료");
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
      if (error.response.status === 400) {
        toast.error("수정 실패");
      } else if (error.response.status === 401) {
        toast.error("토큰 만료");
        nav("/", { replace: true });
      }
    }
  };

  return (
    <Layout>
      <Header title={"이메일 설정"} />
      <main className="mt-20 flex flex-col gap-5 p-4 items-center">
        <div className="w-full py-4 px-3 bg-gray-100 border border-gray-300 rounded-lg text-center text-gray-600 font-medium shadow-sm">
          대표 이메일: {mainemail}
        </div>

        {emailgroup.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center justify-between px-3 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 w-full">
              <Mail />
              <input
                value={item.connection_email}
                onChange={(e) => handleChangeEmail(item.id, e.target.value)}
                className="flex-1 border-none bg-transparent focus:outline-none text-sm text-gray-800"
              />
            </div>
            <button
              onClick={() => handleDeleteEmail(item.connection_email, item.id)}
              className="text-red-500 hover:underline text-sm "
            >
              <CircleX />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddEmail}
          className="w-full py-2 rounded-lg border border-dashed border-gray-400 text-gray-600 hover:bg-gray-100"
        >
          + 이메일 추가
        </button>

        <button
          onClick={handleSyncEmailChanges}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex justify-center gap-3"
        >
          <Save />
          변경사항 저장
        </button>
      </main>
    </Layout>
  );
};

export default EmailSetPage;
