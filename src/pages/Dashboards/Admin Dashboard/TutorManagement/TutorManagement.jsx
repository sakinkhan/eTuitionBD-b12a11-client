import React, { useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
import TutorProfileModal from "../../../../components/TutorProfileModal/TutorProfileModal";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
import PageSizeSelect from "../../../../components/PageSizeSelect/PageSizeSelect";

const TutorManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedTutor, setSelectedTutor] = useState(null);

  // Fetch tutors (admin)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-tutors", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/admin", {
        params: { search: searchText, page, limit },
      });
      return res.data;
    },
  });

  const tutors = data?.tutors || [];
  const totalTutors = data?.total || 0;

  // Approve / Reject with confirmation
  const handleVerifyTutor = async (tutorId, tutorName, action) => {
    const isApprove = action === "approved";

    const result = await Swal.fire({
      title: isApprove ? "Approve Tutor?" : "Reject Tutor?",
      text: isApprove
        ? `This will approve ${tutorName} as a tutor.`
        : `This will reject ${tutorName}. They will not be able to teach.`,
      icon: isApprove ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: isApprove ? "Yes, Approve" : "Yes, Reject",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: isApprove
          ? "btn btn-success text-white rounded-full px-6 mx-1"
          : "btn btn-error text-white rounded-full px-6 mx-1",
        cancelButton: "btn btn-outline btn-primary rounded-full px-6 mx-1",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/tutors/admin/verify/${tutorId}`, {
        tutorStatus: action,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Tutor ${isApprove ? "approved" : "rejected"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Manage <span className="text-primary">Tutors</span> ({totalTutors})
      </h2>

      {/* Search + Page Size */}
      <div className="mb-5 flex justify-center items-center gap-2">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Search tutors..."
        />
        <PageSizeSelect
          value={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

      {/* Tutors Table */}
      <div className="overflow-x-auto">
        {isLoading && <LoadingLottie />}

        {!isLoading && (
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tutor</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, index) => (
                <tr key={tutor.tutorId}>
                  <td>{index + 1 + (page - 1) * limit}</td>

                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle h-10 w-10">
                        <img
                          src={tutor.photoURL}
                          alt={tutor.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="font-semibold">{tutor.name}</div>
                  </td>

                  <td>{tutor.email}</td>

                  <td>
                    <span
                      className={`badge rounded-full ${
                        tutor.tutorStatus === "approved"
                          ? "badge-success"
                          : tutor.tutorStatus === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {tutor.tutorStatus.charAt(0).toUpperCase() +
                        tutor.tutorStatus.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      {/* View profile */}
                      <button
                        className="btn btn-sm btn-info rounded-full tooltip tooltip-primary p-0.5 w-8 h-8"
                        data-tip="View Profile"
                        onClick={() => setSelectedTutor(tutor.tutorId)}
                      >
                        <FaEye className="w-4 h-4" />
                      </button>

                      {/* Approve */}
                      <button
                        className={`btn btn-sm rounded-full tooltip tooltip-primary p-0.5 w-8 h-8 ${
                          tutor.tutorStatus === "approved"
                            ? "btn-success btn-disabled opacity-60 cursor-not-allowed"
                            : "btn-success"
                        }`}
                        data-tip="Approve Tutor"
                        disabled={tutor.tutorStatus === "approved"}
                        onClick={() =>
                          handleVerifyTutor(
                            tutor.tutorId,
                            tutor.name,
                            "approved"
                          )
                        }
                        title={
                          tutor.tutorStatus === "approved"
                            ? "Tutor already approved"
                            : "Approve tutor"
                        }
                      >
                        <FaCheckCircle className="w-4 h-4" />
                      </button>

                      {/* Reject */}
                      <button
                        className={`btn btn-sm rounded-full tooltip tooltip-primary p-0.5 w-8 h-8 ${
                          tutor.tutorStatus === "rejected"
                            ? "btn-error btn-disabled opacity-60 cursor-not-allowed"
                            : "btn-error"
                        }`}
                        data-tip="Reject Tutor"
                        disabled={tutor.tutorStatus === "rejected"}
                        onClick={() =>
                          handleVerifyTutor(
                            tutor.tutorId,
                            tutor.name,
                            "rejected"
                          )
                        }
                        title={
                          tutor.tutorStatus === "rejected"
                            ? "Tutor already rejected"
                            : "Reject tutor"
                        }
                      >
                        <BsFillXCircleFill className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TutorProfileModal
        tutorId={selectedTutor}
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
      />

      <Pagination
        currentPage={page}
        totalItems={totalTutors}
        pageSize={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TutorManagement;
