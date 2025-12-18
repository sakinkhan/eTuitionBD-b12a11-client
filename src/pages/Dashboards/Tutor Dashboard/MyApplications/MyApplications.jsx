import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import ApplyModal from "../../../../components/ApplyModal/ApplyModal";
import Swal from "sweetalert2";
import Pagination from "../../../../components/Pagination/Pagination";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [editingApplication, setEditingApplication] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data = { applications: [], total: 0, page: 1, limit: 20 }, refetch } =
    useQuery({
      queryKey: ["my-applications", user?.email, searchText, page, limit],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get("/applications/my-applications", {
          params: {
            search: searchText.trim(),
            page,
            limit,
          },
        });
        return res.data;
      },
    });

  const applications = data.applications || [];
  const totalApps = data.total || 0;
  const currentPage = data.page || page;
  const pageSize = data.limit || limit;

  const handleApplicationDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/applications/${id}`);

      if (res.data?.deletedCount) {
        refetch();
        Swal.fire({
          title: "Deleted",
          text: "Your application has been removed.",
          icon: "success",
          customClass: {
            confirmButton:
              "btn btn-primary font-semibold rounded-full px-6 py-2",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Applications</span> ({totalApps})
      </h2>

      {/* Search + Page size */}
      <div className="mb-10 flex justify-center">
        <label className="flex items-center w-10/12 md:w-120 bg-accent/70 rounded-full px-3 py-2 shadow-sm">
          <svg
            className="h-4 w-4 text-primary mr-2"
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
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60"
          />
        </label>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="ml-2 p-1 h-9 text-primary rounded-2xl border border-gray-300"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n} className="bg-accent">
              {n}
            </option>
          ))}
        </select>
      </div>

      {totalApps === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No active tuition applications found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Application Code</th>
                <th>Subject(s)</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Expected Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, i) => (
                <tr key={app._id}>
                  <td>{i + 1 + (currentPage - 1) * pageSize}</td>

                  <td>
                    <span className="badge badge-info badge-sm rounded-full">
                      {app.applicationCode}
                    </span>
                  </td>

                  <td>{app.subject}</td>
                  <td>{app.location}</td>

                  <td className="text-yellow-600 font-semibold">
                    ৳ {app.budget?.toLocaleString("en-BD")}
                  </td>

                  <td className="text-primary font-semibold">
                    ৳ {app.expectedSalary?.toLocaleString("en-BD")}
                  </td>

                  <td>
                    <span
                      className={`badge rounded-full px-3 py-2 ${
                        app.status === "paid"
                          ? "badge-success"
                          : app.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>

                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingApplication(app)}
                      className="btn btn-xs btn-success rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                      data-tip="Edit"
                      disabled={app.status === "paid"}
                    >
                      <AiFillEdit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleApplicationDelete(app._id)}
                      className="btn btn-xs btn-error rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                      data-tip="Delete"
                      disabled={app.status === "paid"}
                    >
                      <FaTrashCan className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalItems={totalApps}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <ApplyModal
        isOpen={!!editingApplication}
        onClose={() => setEditingApplication(null)}
        tutor={user}
        application={editingApplication}
        onSuccess={refetch}
      />
    </div>
  );
};

export default MyApplications;
