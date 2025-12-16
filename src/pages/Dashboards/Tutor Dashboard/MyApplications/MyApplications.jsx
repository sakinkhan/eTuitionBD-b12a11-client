import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaEye, FaTrashCan } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import ApplyModal from "../../../../components/ApplyModal/ApplyModal";
import Swal from "sweetalert2";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingApplication, setEditingApplication] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["my-applications", user?.email, searchText.trim()],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/my-applications?search=${searchText}`
      );
      return res.data;
    },
  });
  console.log(applications);

  const handleApplicationDelete = (id) => {
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
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your application has been deleted.",
              icon: "success",
              customClass: {
                confirmButton:
                  "btn btn-primary font-semibold rounded-full px-6 py-2 mb-2 mx-1",
              },
              buttonsStyling: false,
            });
          }
        });
      }
    });
  };

  return (
    <div className="">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Applications</span> (
        {applications.length})
      </h2>
      {/* Search Bar */}
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
            placeholder="Search by application code, subject(s), location, status..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60 text-sm"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Aplication Code</th>
              <th>Subject(s)</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Expected Salary</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={app._id}>
                <th>{i + 1}</th>
                <td>
                  <p className="badge badge-sm badge-info rounded-full">
                    {app.applicationCode}
                  </p>
                </td>
                <td>{app.subject}</td>
                <td>{app.location}</td>
                <td className="text-yellow-700 font-semibold">
                  ৳ {app.budget?.toLocaleString("en-BD")}
                </td>
                <td className="text-primary font-semibold">
                  ৳{app.expectedSalary?.toLocaleString("en-BD")}
                </td>
                <td>
                  <span
                    className={`badge inline-flex grow items-center justify-center 
                   whitespace-nowrap truncate text-center
                    px-3 py-2 leading-tight rounded-full ${
                      app.status === "approved & paid"
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
                    className="btn btn-xs btn-success rounded-full tooltip tooltip-primary"
                    data-tip="Edit"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleApplicationDelete(app._id)}
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
      {/* Edit applications Post Modal */}
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
