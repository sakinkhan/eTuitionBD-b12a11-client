import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDone, MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import TutorModal from "../../../../components/TutorModal/TutorModal";
import Swal from "sweetalert2";
import Pagination from "../../../../components/Pagination/Pagination";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data = { applications: [], total: 0, page: 1, limit: 20 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["applied-tutors", user?.email, searchText, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/applications", {
        params: {
          search: searchText,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const applications = data.applications || [];
  const totalApps = data.total || 0;
  const currentPage = data.page || 1;
  const pageSize = data.limit || 20;

  const handleApprove = async (app) => {
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
      const res = await axiosSecure.post(
        `/payment-checkout-session`,
        paymentInfo
      );
      window.location.assign(res.data.url);
    });
  };

  const handleReject = (app) => {
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
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Applied <span className="text-primary">Tutors</span> ({totalApps})
      </h2>
      {/* Search Bar & Page Size selection */}
      <div className="mb-10 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Start typing to search..."
          className="mr-2"
        />
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

      {totalApps === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No Active Tutor Applications found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          {isLoading && <LoadingLottie />}
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
                  <td>{i + 1 + (currentPage - 1) * pageSize}</td>

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
                        onClick={() =>
                          navigate(`/tuition/${app.tuitionPostId}`)
                        }
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
      )}

      {/* Pagination controls */}
      <Pagination
        currentPage={page}
        totalItems={totalApps}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <TutorModal
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        application={selectedTutor}
      />
    </div>
  );
};

export default AppliedTutors;
