import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingUser, setEditingUser] = useState(null);

  const {
    data: dbUserData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  const loggedInUser = dbUserData?.user || {};
  console.log(loggedInUser);

  if (!user || isLoading) return <LoadingLottie />;

  const handleSaveEdit = async (updatedData) => {
    const { name, phone, photoURL } = updatedData;
    const payload = { name, phone, photoURL };
    await axiosSecure.patch(`/users/${editingUser._id}`, payload);
    setEditingUser(null);
    refetch();
    Swal.fire({
      icon: "success",
      title: "User updated",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-10 bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 border-2 border-primary rounded-3xl shadow-lg mt-10 h-full">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Photo */}
        <div className="shrink-0">
          <img
            src={
              loggedInUser?.photoURL ||
              user.photoURL ||
              "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
            }
            alt={loggedInUser?.name || user.displayName}
            className="w-40 h-40 rounded-full object-cover border-4 border-secondary"
          />
        </div>

        {/* User Details */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content">
            {loggedInUser?.name || user.displayName}
          </h2>
          <p className="text-base-content mt-1">
            {loggedInUser?.isAdmin ? "Admin" : loggedInUser?.role || "Student"}
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-base-content">
            <div>
              <p className="font-semibold">Email:</p>
              <p>{loggedInUser?.email || user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>{loggedInUser?.phone || "Not Provided"}</p>
            </div>
            <div>
              <p className="font-semibold">Verification Status:</p>
              <p>{loggedInUser?.verified ? "Verified" : "Not Verified"}</p>
            </div>
            <div>
              <p className="font-semibold">Joined:</p>
              <p>{new Date(user.metadata.creationTime).toLocaleString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => setEditingUser(loggedInUser)}
              className="btn btn-primary px-6 py-2 rounded-full hover:btn-secondary hover:text-base-content hover:scale-105 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default UserProfile;
