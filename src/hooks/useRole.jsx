import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: roleLoading,
    data: userData = { role: "student", isAdmin: false },
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return {
        role: res.data?.role || "student",
        isAdmin: res.data?.isAdmin || false,
      };
    },
  });

  return {
    role: userData.role,
    isAdmin: userData.isAdmin,
    roleLoading,
  };
};

export default useRole;
