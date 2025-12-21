import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { IoChevronBack } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

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

  // Tutor Only
  const { data: tutorData, isLoading: tutorLoading } = useQuery({
    queryKey: ["my-tutor-profile"],
    enabled: loggedInUser?.role === "tutor",
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/me");
      return res.data.tutor;
    },
  });

  if (!user || isLoading || (loggedInUser?.role === "tutor" && tutorLoading)) {
    return <LoadingLottie />;
  }

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
    <div className="max-w-4xl mx-auto py-10">
      <div className="-mb-4">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn flex items-center gap-2 px-6 rounded-full
            bg-primary text-white hover:bg-secondary hover:text-gray-900
            shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <IoChevronBack size={18} />
          Go Back
        </button>
      </div>
      <div className="max-w-4xl mx-auto p-10 bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 border-2 border-primary rounded-3xl shadow-lg mt-10 h-full">
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
            <p className="text-primary mt-1">
              {loggedInUser?.isAdmin
                ? "Admin"
                : (loggedInUser?.role || "Student").charAt(0).toUpperCase() +
                  (loggedInUser?.role || "Student").slice(1)}
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
                <p>{loggedInUser?.isVerified ? "Verified" : "Not Verified"}</p>
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
                className="btn btn-primary text-white px-6 py-2 rounded-full hover:bg-secondary hover:text-gray-800 hover:scale-105 transition"
              >
                Edit Account Profile
              </button>
            </div>
          </div>

          {/* Tutor only */}
          {loggedInUser?.role === "tutor" && tutorData && (
            <>
              <div className="divider divider-primary my-8 text-primary font-bold text-xl">
                Tutor Profile
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base-content">
                <div>
                  <p className="font-semibold">Qualifications:</p>
                  <p>{tutorData.qualifications || "—"}</p>
                </div>

                <div>
                  <p className="font-semibold">Experience:</p>
                  <p>{tutorData.experience || "—"}</p>
                </div>

                <div>
                  <p className="font-semibold">Subjects:</p>
                  {tutorData.subjects?.length ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tutorData.subjects.map((s, idx) => (
                        <span
                          key={idx}
                          className="badge badge-secondary text-gray-800 badge-sm rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold">Expected Salary:</p>
                  <p className="font-bold">
                    ৳ {tutorData.expectedSalary?.toLocaleString() || "—"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="font-semibold">About:</p>
                  <p className="leading-relaxed">
                    {tutorData.bio || "No bio provided."}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Tutor Status:</p>
                  <span
                    className={`badge rounded-full ${
                      tutorData.tutorStatus === "approved"
                        ? "badge-success"
                        : tutorData.tutorStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tutorData.tutorStatus.charAt(0).toUpperCase() +
                      tutorData.tutorStatus.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => navigate("/dashboard/tutor-profile-setup")}
                  className="btn btn-outline btn-primary rounded-full flex items-center gap-2 hover:bg-primary hover:text-white transition"
                >
                  <FiEdit size={16} />
                  {tutorData ? "Edit Tutor Profile" : "Complete Tutor Profile"}
                </button>
              </div>
            </>
          )}
        </div>
        <EditUserModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
};

export default UserProfile;
