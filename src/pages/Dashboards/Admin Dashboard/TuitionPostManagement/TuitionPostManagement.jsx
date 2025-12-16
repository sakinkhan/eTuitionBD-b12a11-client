import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import { useNavigate } from "react-router";
import { MdDone, MdVerified } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { BsXCircleFill } from "react-icons/bs";

const TuitionPostManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { data: tuitionPosts = [] } = useQuery({
    queryKey: ["tuition-posts", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-posts?search=${searchText}`);
      return res.data;
    },
  });
  console.log(tuitionPosts);

  const handleApprove = () => {};
  const handleReject = () => {};

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Manage <span className="text-primary">Tuition</span> Posts (
        {tuitionPosts.length})
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
            placeholder="Search tuition posts..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60 text-sm"
          />
        </label>
      </div>

      {/* Tuition Posts Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tuition Info</th>
              <th>Contact Email</th>
              <th>Budget</th>
              <th>Date Posted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitionPosts.map((post, index) => {
              return (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="badge badge-sm badge-info rounded-full">
                        {post.tuitionCode}
                      </div>
                      <button
                        onClick={() => navigate(`/tuition/${post._id}`)}
                        className="text-xs text-primary text-left underline hover:text-blue-500 cursor-pointer"
                      >
                        View Tuition Details
                      </button>
                    </div>
                  </td>

                  <td>{post.contactEmail}</td>
                  <td>
                    <span className="text-primary font-semibold">
                      ৳ {post.budget.toLocaleString("en-BD")}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge inline-flex grow items-center justify-center 
                   whitespace-nowrap truncate text-center
                    px-3 py-2 leading-tight rounded-full ${
                      post.status === "approved & paid"
                        ? "badge-success"
                        : post.status === "rejected"
                        ? "badge-error"
                        : post.status === "pending"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                    >
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {/* Approve */}
                      <button
                        // disabled={post.status !== "pending"}
                        onClick={() => handleApprove(post)}
                        className="btn btn-xs btn-success rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                        data-tip="Approve"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                      </button>
                      {/* Reject */}
                      <button
                        // disabled={post.status !== "pending"}
                        onClick={() => handleReject(post)}
                        className="btn btn-xs btn-error rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                        data-tip="Reject"
                      >
                        <GiCancel className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {tuitionPosts.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No Tuition Posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TuitionPostManagement;
