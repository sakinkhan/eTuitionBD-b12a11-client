import axios from "axios";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });
