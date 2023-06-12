import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig);
      } catch (error) {
        console.log("err");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);
const http = {
  post: app.post,
  get: app.get,
  put: app.put,
  delete: app.delete,
  patch: app.patch,
};

export default http;
