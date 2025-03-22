import axios from "axios";

const API_URL = "http://13.124.205.29:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//로그인 요청, 토큰 발급 후 로컬 저장소에 저장
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/`, { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
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

//로그아웃 요청
export const logout = async () => {
  localStorage.removeItem("token");
  return axios.post(`${API_URL}/`);
};

//데이터 요청
export const getData = async () => {
  const token = localStorage.getItem("token");

  try {
    return axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const re_token = await refreshToken();
      return await axios.post(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${re_token}` },
      });
    } else {
      throw error;
    }
  }
};

export const refreshToken = async () => {
  const response = await axios.post(`${API_URL}/`);
  localStorage.setItem("token", response.data.accessToken);
  return response.data.accessToken;
};
