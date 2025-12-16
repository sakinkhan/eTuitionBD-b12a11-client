import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { BsTrash, BsXCircleFill } from "react-icons/bs";
import EditUserModal from "../../../../components/EditUserModal/EditUserModal";
import { MdVerified } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LuUserRoundX } from "react-icons/lu";

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  console.log(users);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  const renderRole = (user) => (user.isAdmin ? "Admin" : capitalize(user.role));

  const isCurrentUser = (user) => {
    if (!currentUser || !user) return false;
    return (
      user._id.toString() === currentUser._id?.toString() ||
      user.email === currentUser.email
    );
  };

  // Admin toggle
  const handleAssignAdmin = async (user) => {
    const confirmed = await Swal.fire({
      title: "Make Admin?",
      text: `${user.name} account will receive admin access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      customClass: {
        confirmButton:
          "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    });
    if (confirmed.isConfirmed) {
      const res = await axiosSecure.patch(`/users/${user._id}/admin`, {
        isAdmin: true,
      });
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${user.name} is now Admin`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleRemoveAdmin = async (user) => {
    const confirmed = await Swal.fire({
      title: "Remove Admin Access?",
      text: `${user.name} account will lose admin privileges.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    });
    if (confirmed.isConfirmed) {
      const res = await axiosSecure.patch(`/users/${user._id}/admin`, {
        isAdmin: false,
      });
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${user.name} is no longer Admin`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = await Swal.fire({
      title: "Delete User?",
      text: `${user.name} account will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    });
    if (confirmed.isConfirmed) {
      await axiosSecure.delete(`/users/${user._id}`);
      refetch();
      Swal.fire({
        icon: "success",
        title: "User deleted",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSaveEdit = async (updatedData) => {
    const payload = { ...updatedData, isAdmin: false };
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
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Manage <span className="text-primary">Users</span> ({users.length})
      </h2>

      {/* Search */}
      <div className="mb-5 flex justify-center">
        <label className="flex items-center w-[250px] md:w-[300px] bg-accent/70 rounded-full px-3 py-2 shadow-sm">
          <svg
            className="h-4 w-4 text-base-content mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60 text-sm"
          />
        </label>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Verified?</th>
              <th>Email</th>
              <th>Role</th>
              <th className="flex items-center justify-center">Admin Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle h-10 w-10">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="font-bold">{user.name}</div>
                  </td>
                  <td>
                    {user.verified ? (
                      <MdVerified className="text-green-500 text-2xl" />
                    ) : (
                      <BsXCircleFill className="text-red-500 text-[21px]" />
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>{renderRole(user)}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      {user.isAdmin ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-sm btn-error rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                          data-tip="Remove Admin"
                          disabled={isCurrentUser(user)}
                        >
                          <FiShieldOff className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAssignAdmin(user)}
                          className="btn btn-sm btn-success rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                          data-tip="Make Admin"
                          disabled={isCurrentUser(user)}
                        >
                          <FaUserShield className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-sm btn-info rounded-full mx-1 tooltip tooltip-primary p-0.5 w-8 h-8"
                        data-tip="Edit User"
                        onClick={() => setEditingUser(user)}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-error rounded-full mx-1 tooltip tooltip-primary p-0.5 w-8 h-8"
                        data-tip="Delete User"
                        onClick={() => handleDeleteUser(user)}
                        disabled={isCurrentUser(user)}
                      >
                        <BsTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No users found.</p>
        )}
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

export default UserManagement;
