import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCurrentUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading: roleLoading,
    isError,
  } = useQuery({
    queryKey: ["current-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users/me");
        return res.data;
      } catch (err) {
        if (err.response?.status === 404) {
          return null; // user not bootstrapped yet
        }
        throw err;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // Safe defaults (locked-down, not optimistic)
  // const role = data?.role ?? "student";
  const role = user ? data?.role : null;

  const isAdmin = !!data?.isAdmin;
  const profileCompleted = data?.profileCompleted ?? false;
  const name = data?.name ?? null;
  const photoURL = data?.photoURL ?? null;

  return {
    role,
    isAdmin,
    profileCompleted,
    name,
    photoURL,
    roleLoading,
    isError,
  };
};

export default useCurrentUser;
