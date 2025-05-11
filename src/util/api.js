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
export const onBookMark = async (data) => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.post(
      `/api/save/content`,
      { data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.post(
        `/api/save/content`,
        { data },

        {
          headers: { Authorization: `Bearer ${re_token}` },
        }
      );
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//북마크 삭제
export const onDeleteBookMark = async (id) => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.delete(
      `/api/save/content`,
      { contents_id: [id] },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.delete(
        `/api/save/content`,
        { contents_id: [id] },
        {
          headers: { Authorization: `Bearer ${re_token}` },
        }
      );
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//탈퇴하기
export const onDeleteAccount = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    return api.get(`/my-page/unsubscribe`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await axios.get(`/my-page/unsubscribe`, {
        headers: { Authorization: `Bearer ${re_token}` },
      });
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//비밀번호 변경
export const onChangePassWord = async (oldpw, newpw) => {
  let token = localStorage.getItem("accessToken");
  try {
    return await api.patch(
      `/my-page/change/password`,
      {
        old_password: oldpw,
        new_password: newpw,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();

      return await api.patch(
        `/my-page/change/password`,
        {
          old_password: oldpw,
          new_password: newpw,
        },
        {
          headers: {
            Authorization: `Bearer ${re_token}`,
          },
        }
      );
    } else if (error.response && error.response.status === 400) {
      throw error;
    }
  }
};

//이메일 조회
export const getEmail = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    return await api.get(`/connection/email`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();

      return await api.patch(`/connection/email`, {
        headers: {
          Authorization: `Bearer ${re_token}`,
        },
      });
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//이메일 삭제
export const onDeleteEmail = async (email) => {
  const token = localStorage.getItem("accessToken");
  try {
    return await api.patch(
      `/connection/email`,
      {
        edit_email: [{ old_email: email, new_email: null }],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await api.patch(
        `/connection/email`,
        {
          edit_email: [{ old_email: email, new_email: null }],
        },
        { headers: { Authorization: `Bearer ${re_token}` } }
      );
    } else if (error.response && error.response.status === 403) {
      throw error;
    }
  }
};

//이메일 수정
export const onChangeEmail = async (old_email, new_email) => {
  const token = localStorage.getItem("accessToken");
  try {
    return await api.patch(
      `/connection/email`,
      {
        edit_email: [{ old_email: old_email, new_email: new_email }],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await api.patch(
        `/connection/email`,
        {
          edit_email: [{ old_email: old_email, new_email: new_email }],
        },
        { headers: { Authorization: `Bearer ${re_token}` } }
      );
    } else if (error.response) {
      throw error;
    }
  }
};

//이메일 추가
export const onAddEmail = async (emailArray) => {
  const token = localStorage.getItem("accessToken");
  try {
    return await api.post(
      `/connection/email`,
      { email: emailArray },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const re_token = await refreshToken();
      return await api.post(
        `/connection/email`,
        { email: emailArray },
        { headers: { Authorization: `Bearer ${re_token}` } }
      );
    } else if (error.response) {
      throw error;
    }
  }
};
