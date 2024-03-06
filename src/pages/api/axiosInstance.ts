import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 5000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log('Starting Request', config);
    return config;
  },
  (error) => {
    console.error('Request Error, 요청 에러', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 로직
    // console.log('Response:', response);
    return response;
  },
  (error) => {
    // 응답 상태 코드 200이 아닌 경우
    console.error('Response Error, 응답 에러', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
