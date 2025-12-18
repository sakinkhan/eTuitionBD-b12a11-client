import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashCan } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import EditTuitionModal from "../../../../components/EditTuitionModal/EditTuitionModal";
import { useNavigate } from "react-router";
import Pagination from "../../../../components/Pagination/Pagination";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingTuition, setEditingTuition] = useState(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Fetch tuitions with pagination
  const {
    data = { tuitions: [], total: 0, page: 1, limit: 20 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-posts", user?.email, searchText],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuition-posts/my-posts?search=${searchText}`
      );
      return res.data || [];
    },
  });

  const tuitions = data.tuitions || [];
  const totalTuitions = data.total || 0;
  const currentPage = data.page || 1;
  const pageSize = data.limit || 20;
  console.log("Inside My tuitions", tuitions);

  if (isLoading) {
    return <LoadingLottie />;
  }

  const handleTuitionDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuition-posts/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your tuition post has been deleted.",
              icon: "success",
              customClass: {
                confirmButton:
                  "btn btn-success font-semibold rounded-full px-6 py-2 mb-2 mx-1",
              },
              buttonsStyling: false,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Tuition</span> Posts ({totalTuitions})
      </h2>

      {/* Search & Page Size selection */}
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
            placeholder="Start typing to search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60"
          />
        </label>
        {/* Page Size selection drop down */}
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="ml-2 p-1 h-9 text-primary rounded-2xl focus:ring-1 focus:ring-primary focus:outline-none border border-gray-300 "
        >
          <option className="bg-accent" value={5}>
            5
          </option>
          <option className="bg-accent" value={10}>
            10
          </option>
          <option className="bg-accent" value={20}>
            20
          </option>
          <option className="bg-accent" value={50}>
            50
          </option>
        </select>
      </div>

      {tuitions.length === 0 ? (
        <p className="text-gray-500 text-center py-5">
          No Active Tuition Post found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Tuition Code</th>
                <th>Class</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Posted On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, i) => (
                <tr key={tuition._id}>
                  <th>{i + 1 + (currentPage - 1) * pageSize}</th>
                  <td>{tuition.subject}</td>
                  <td>
                    <p className="badge badge-info rounded-full badge-sm mt-1">
                      {tuition.tuitionCode}
                    </p>
                  </td>
                  <td>{tuition.classLevel}</td>
                  <td>{tuition.location}</td>
                  <td className="text-primary font-semibold">
                    ৳ {tuition.budget.toLocaleString("en-BD")}
                  </td>
                  <td>{new Date(tuition.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge inline-flex grow items-center justify-center 
                      whitespace-nowrap truncate text-center
                      px-3 py-2 leading-tight rounded-full ${
                        tuition.status === "admin-approved" ||
                        tuition.status === "paid"
                          ? "badge-success"
                          : tuition.status === "admin-rejected"
                          ? "badge-error"
                          : tuition.status === "admin-pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {tuition.status
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("-")}
                    </span>
                  </td>
                  <td className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/tuition/${tuition._id}`)}
                      className="btn btn-xs btn-info rounded-full tooltip tooltip-primary"
                      data-tip="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditingTuition(tuition)}
                      className="btn btn-xs btn-success rounded-full tooltip tooltip-primary"
                      data-tip="Edit"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => handleTuitionDelete(tuition._id)}
                      className="btn btn-xs btn-error rounded-full tooltip tooltip-primary"
                      data-tip="Delete"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination controls */}
      <Pagination
        currentPage={page}
        totalItems={totalTuitions}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      {/* Edit Tuition Post Modal */}
      <EditTuitionModal
        tuition={editingTuition}
        isOpen={!!editingTuition}
        onClose={() => setEditingTuition(null)}
        onSave={refetch}
        axiosSecure={axiosSecure}
      />
    </div>
  );
};

export default MyTuitions;
