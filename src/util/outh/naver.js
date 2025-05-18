const CLIENT_ID = import.meta.env.VITE_REST_API_KEY_NAVER;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
const STATE = false;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
