import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import { useNavigate } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Pagination from "../../../../components/Pagination/Pagination";
import PageSizeSelect from "../../../../components/PageSizeSelect/PageSizeSelect";

const TuitionPostManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data: tuitionPostsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuition-posts", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-posts/admin-dashboard`, {
        params: { search: searchText, page, limit },
      });
      return res.data;
    },
  });

  const tuitionPosts = tuitionPostsData?.posts || [];
  const totalItems = tuitionPostsData?.total || 0;
  const pageSize = limit;
  const currentPage = page;

  const handleApprove = async (tuitionId) => {
    const result = await Swal.fire({
      title: "Approve and publish tuition post?",
      text: "Once approved, this post will be visible to everyone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      customClass: {
        confirmButton:
          "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary text-white btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/tuition-posts/admin/${tuitionId}`, {
          status: "admin-approved",
        });
        refetch();
        Swal.fire({
          title: "Approved and published!",
          icon: "success",
          text: "This tuition post has been approved and published.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to approve the post.");
      }
    }
  };

  const handleReject = async (tuitionId) => {
    const result = await Swal.fire({
      title: "Reject tuition post?",
      text: "Once rejected, this post will not be visible to users.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary text-white btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/tuition-posts/admin/${tuitionId}`, {
          status: "admin-rejected",
        });
        refetch();
        Swal.fire({
          title: "Rejected",
          icon: "success",
          text: "This tuition post has been rejected.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject the post.");
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Manage <span className="text-primary">Tuition</span> Posts ({totalItems}
        )
      </h2>

      {/* Search Bar & Page Size */}
      <div className="mb-5 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Start typing to search..."
          className="mr-2"
        />
        <PageSizeSelect
          value={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingLottie />
        </div>
      ) : tuitionPosts.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">
          No Tuition Posts found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Info</th>
                <th>Student Name</th>
                <th>Contact Email</th>
                <th>Budget</th>
                <th>Date Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitionPosts.map((post, i) => {
                const isActionable =
                  post.status?.toLowerCase() === "admin-pending";
                return (
                  <tr key={post._id}>
                    <td>{i + 1 + (currentPage - 1) * pageSize}</td>
                    <td>
                      <div className="flex flex-col items-start gap-1.5">
                        <div className="badge badge-sm badge-info rounded-full">
                          {post.tuitionCode || "-"}
                        </div>
                        <button
                          onClick={() => navigate(`/tuition/${post._id}`)}
                          className="text-xs text-primary text-left underline hover:text-blue-500 cursor-pointer"
                        >
                          View Tuition Details
                        </button>
                      </div>
                    </td>
                    <td>{post.studentName || "-"}</td>
                    <td>{post.contactEmail || post.studentEmail || "-"}</td>
                    <td>
                      <span className="text-primary font-semibold">
                        ৳ {post.budget?.toLocaleString("en-BD") || "-"}
                      </span>
                    </td>
                    <td>
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`badge inline-flex grow items-center justify-center 
                          whitespace-nowrap truncate text-center
                          px-3 py-2 leading-tight rounded-full ${
                            post.status === "paid"
                              ? "badge-success"
                              : post.status === "admin-approved"
                              ? "badge-info"
                              : post.status === "admin-pending"
                              ? "badge-warning"
                              : post.status === "admin-rejected"
                              ? "badge-error"
                              : "badge-ghost"
                          }`}
                      >
                        {post.status
                          ? post.status
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                          : "-"}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!isActionable}
                          onClick={() => handleApprove(post._id)}
                          className="btn btn-xs btn-success rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                          data-tip="Approve"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          disabled={!isActionable}
                          onClick={() => handleReject(post._id)}
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default TuitionPostManagement;
