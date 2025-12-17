import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDone, MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import TutorModal from "../../../../components/TutorModal/TutorModal";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applied-tutors", user?.email, searchText],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?search=${searchText}`);
      return res.data;
    },
  });

  console.log(applications);

  const handleApprove = async (app) => {
    console.log(app);
    Swal.fire({
      title: "Approve this application?",
      text: `Once you approve, you'll be taken to checkout to complete the payment of ৳${app.expectedSalary}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "btn btn-primary hover:bg-secondary hover:text-gray-800 text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const paymentInfo = {
        expectedSalary: app.expectedSalary,
        tuitionCode: app.tuitionCode,
        tutorName: app.tutorName,
        tuitionPostId: app.tuitionPostId,
        tuitionTitle: app.tuitionTitle,
        tutorEmail: app.tutorEmail,
        tutorId: app.tutorId,
        applicationId: app._id,
      };
      console.log("Front end payment info", paymentInfo);
      const res = await axiosSecure.post(
        `/payment-checkout-session`,
        paymentInfo
      );
      window.location.assign(res.data.url);
    });
  };

  const handleReject = (app) => {
    console.log(app._id);
    Swal.fire({
      title: "Reject this application?",
      text: "The tutor will be informed and the application will be permanently rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "btn btn-error text-white font-semibold rounded-full px-6 py-2 mb-2 mx-1",
        cancelButton:
          "btn btn-primary btn-outline font-semibold rounded-full px-6 py-2 mb-2 mx-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        await axiosSecure.patch(`/applications/reject/${app._id}`);

        Swal.fire({
          title: "Application Rejected",
          text: "The tutor application has been rejected successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "btn btn-primary font-semibold rounded-full px-6 py-2",
          },
          buttonsStyling: false,
        });

        refetch();
      } catch (error) {
        console.error("Failed to reject application", error);

        Swal.fire({
          title: "Something went wrong",
          text: "We couldn't reject the application. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
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
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Applied <span className="text-primary">Tutors</span> (
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
            placeholder="Search by tutor name, tuition code, status..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60 text-sm"
          />
        </label>
      </div>

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
                <td className="w-20 md:w-40">
                  <div className="flex flex-col items-start gap-1">
                    <p className="badge badge-info rounded-full badge-sm mt-1">
                      {app.tuitionCode}
                    </p>
                    <button
                      onClick={() => navigate(`/tuition/${app.tuitionPostId}`)}
                      className="text-xs text-primary text-left underline hover:text-blue-500 cursor-pointer"
                    >
                      View Tuition Details
                    </button>
                  </div>
                </td>

                {/* Tutor Details */}
                <td className="max-w-70">{app.qualifications}</td>
                <td className="max-w-50">{app.experience}</td>
                <td className="max-w-30 text-primary font-semibold">
                  ৳ {app.expectedSalary.toLocaleString("en-BD")}
                </td>

                {/* Status */}
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
                      data-tip="Approve & Pay Tutor"
                    >
                      <MdDone size={14} />
                    </button>

                    {/* Reject */}
                    <button
                      disabled={app.status !== "pending"}
                      onClick={() => handleReject(app)}
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
