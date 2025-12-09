import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  useEffect(() => {
    //  Intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor Response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
