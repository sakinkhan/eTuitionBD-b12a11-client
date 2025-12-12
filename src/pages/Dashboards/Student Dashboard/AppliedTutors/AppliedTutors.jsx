import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDone, MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import TutorModal from "../../../../components/TutorModal/TutorModal";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTutor, setSelectedTutor] = useState(null);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applied-tutors", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?studentEmail=${user?.email}`
      );
      return res.data;
    },
  });
  console.log(applications);

  const handleApprove = (app) => {
    navigate(`/checkout/${app._id}`, {
      state: {
        salary: app.expectedSalary,
        tutorId: app.tutorId,
        tuitionId: app.tuitionId,
      },
    });
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/applications/reject/${id}`);
    refetch();
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Applied <span className="text-primary">Tutors</span> (
        {applications.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tutor</th>
              <th>Applied For</th>
              <th>Qualifications</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, i) => (
              <tr key={app._id}>
                <td>{i + 1}</td>

                {/* Tutor Info */}
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={app.tutorPhoto}
                      alt=""
                      className="w-10 h-10 rounded-full border"
                    />
                    <p className="font-semibold">{app.tutorName}</p>
                  </div>
                </td>

                {/* Tuition Info */}
                <td>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{app.tuitionTitle}</p>

                    <p className="text-xs text-gray-500">
                      Class: {app.classLevel}
                    </p>

                    <p className="text-xs text-gray-500">
                      Location: {app.location}
                    </p>

                    <span className="badge badge-primary badge-sm mt-1">
                      {app.tuitionCode || `TP-${app.tuitionId?.slice(-4)}`}
                    </span>

                    <button
                      onClick={() => navigate(`/tuition/${app.tuitionId}`)}
                      className="text-xs text-blue-600 underline hover:text-blue-800"
                    >
                      View Tuition
                    </button>
                  </div>
                </td>

                {/* Tutor Details */}
                <td>{app.qualifications}</td>
                <td>{app.experience}</td>
                <td>৳{app.expectedSalary}</td>

                {/* Status */}
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

                {/* Action Buttons */}
                <td>
                  <div className="flex items-center gap-2">
                    {/* View Tutor Modal */}
                    <button
                      onClick={() => setSelectedTutor(app)}
                      className="btn btn-xs btn-info rounded-full tooltip tooltip-primary"
                      data-tip="View Tutor Details"
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Approve */}
                    <button
                      disabled={app.status !== "pending"}
                      onClick={() => handleApprove(app)}
                      className="btn btn-xs btn-success rounded-full tooltip tooltip-primary"
                      data-tip="Approve Tutor"
                    >
                      <MdDone size={14} />
                    </button>

                    {/* Reject */}
                    <button
                      disabled={app.status !== "pending"}
                      onClick={() => handleReject(app._id)}
                      className="btn btn-xs btn-error rounded-full tooltip tooltip-primary"
                      data-tip="Reject Tutor"
                    >
                      <MdClose size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TutorModal
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        application={selectedTutor}
      />
    </div>
  );
};

export default AppliedTutors;
