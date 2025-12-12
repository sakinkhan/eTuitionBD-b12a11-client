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

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/my-applications");
      console.log(res.data);
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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
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
                <td>{app.tuitionPost?.subject}</td>
                <td>{app.tuitionPost?.location}</td>
                <td>৳{app.tuitionPost?.budget}</td>
                <td>৳{app.expectedSalary}</td>
                <td>
                  <span
                    className={`badge rounded-full ${
                      app.status === "approved"
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
