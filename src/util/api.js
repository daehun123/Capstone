import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 토큰 관리
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get(`${API_URL}/refresh-token`, {
          withCredentials: true,
        });
        const { accessToken, refreshToken } = res.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        const nav = useNavigate();
        nav("/", { replace: true });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
//이메일 인증 코드 받아오기
export const getCode = async (email) => {
  const response = await api.post("/email/verify", { email });
  return response;
};
// 로그인
export const login = async (email, password) => {
  const response = await api.post(`/login`, { email, password });
  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return response;
};
// 로그아웃
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
// 회원가입
export const signup = async (name, email, password, birthdate) => {
  return api.post(`/signup`, { name, email, password, birthdate });
};

// 데이터 요청 (자동 토큰 갱신)
export const getData = async () => {
  return api.get(`/hello`);
};

// 북마크 저장
export const onBookMark = async (data) => {
  return api.post(`/api/save/content`, { data });
};

// 북마크 삭제
export const onDeleteBookMark = async (id) => {
  return api.delete(`/api/save/content`, { data: { contents_id: [id] } });
};

// 탈퇴
export const onDeleteAccount = async () => {
  return api.get(`/my-page/unsubscribe`);
};

// 비밀번호 변경
export const onChangePassWord = async (oldpw, newpw) => {
  return api.patch(`/my-page/change/password`, {
    old_password: oldpw,
    new_password: newpw,
  });
};

// 이메일 목록 조회
export const getEmail = async () => {
  return api.get(`/connection/email`);
};

// 이메일 삭제
export const onDeleteEmail = async (email) => {
  return api.patch(`/connection/email`, {
    edit_email: [{ old_email: email, new_email: null }],
  });
};

// 이메일 수정
export const onChangeEmail = async (old_email, new_email) => {
  return api.patch(`/connection/email`, {
    edit_email: [{ old_email, new_email }],
  });
};

// 이메일 추가
export const onAddEmail = async (emailArray) => {
  return api.post(`/connection/email`, { email: emailArray });
};
