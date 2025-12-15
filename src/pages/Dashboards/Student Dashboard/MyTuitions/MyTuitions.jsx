import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashCan } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import EditTuitionModal from "../../../../components/EditTuitionModal/EditTuitionModal";
import { useNavigate } from "react-router";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingTuition, setEditingTuition] = useState(null);
  const navigate = useNavigate();

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["my-posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuition-posts/my-posts");
      console.log(res.data);
      return res.data.filter((t) => t.status === "approved");
    },
  });
  console.log(tuitions);

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
    <div className="">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Tuition</span> Posts (
        {tuitions.length})
      </h2>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, i) => (
                <tr key={tuition._id}>
                  <th>{i + 1}</th>
                  <td>{tuition.subject}</td>
                  <td>
                    <p className="badge badge-info rounded-full badge-sm mt-1">
                      {tuition.tuitionCode}
                    </p>
                  </td>
                  <td>{tuition.classLevel}</td>
                  <td>{tuition.location}</td>
                  <td>৳{tuition.budget}</td>
                  <td>{new Date(tuition.createdAt).toLocaleDateString()}</td>
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
