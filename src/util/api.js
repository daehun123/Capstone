import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//로그인 요청, 토큰 발급 후 로컬 저장소에 저장
export const login = async (email, password) => {
  const response = await api.post(
    `/login`,
    { email, password },
    { withCredentials: true }
  );
  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return response;
};

//회원가입 요청
export const signup = async (name, email, password, birthdate) => {
  const response = await api.post(`/signup`, {
    name,
    email,
    password,
    birthdate,
  });
  return response;
};
//이메일 인증 코드 받아오기
export const getCode = async (email) => {
  const response = await api.post("/email/verify", { email });
  return response;
};
//로그아웃 요청
export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return api.post(`/`);
};

//데이터 요청
export const getData = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.get(`/hello`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.get(`/hello`, {
        headers: { Authorization: `Bearer ${re_token}` },
      });
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//토큰 재발급
const refreshToken = async () => {
  const response = await api.get(`/refresh-token`);
  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return accessToken;
};

//북마크
export const bookMark = async (id, mark) => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.get(`/`, {
      headers: { Authorization: `Bearer ${token}` },
      body: { id, mark },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.get(`/`, {
        headers: { Authorization: `Bearer ${re_token}` },
        body: { id, mark },
      });
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

export const onDeleteAccount = async (id) => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.get(`/`, {
      headers: { Authorization: `Bearer ${token}` },
      body: { id, mark },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.get(`/`, {
        headers: { Authorization: `Bearer ${re_token}` },
        body: { id, mark },
      });
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};
