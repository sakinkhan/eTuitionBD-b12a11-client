import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MdCancel,
  MdOutlineDescription,
  MdSubject,
  MdVerified,
  MdWorkHistory,
} from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import LoadingLottie from "../Lotties/LoadingLottie";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PiMoney, PiSealWarningFill } from "react-icons/pi";
import { AiTwotoneMail } from "react-icons/ai";
import { GrPhone } from "react-icons/gr";

const TutorProfileModal = ({ tutorId, isOpen, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tutor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutor-profile", tutorId],
    enabled: !!tutorId && isOpen,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${tutorId}`);
      return res.data.tutor;
    },
  });

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box max-w-xl md:max-w-3xl p-9 rounded-3xl">
        {/* Loading */}
        {isLoading && (
          <div className="py-20 flex justify-center">
            <LoadingLottie />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-10 text-error">
            Failed to load tutor profile.
          </div>
        )}

        {/* Content */}
        {!isLoading && tutor && (
          <>
            {/* Header */}
            <div className="flex items-start gap-5">
              <img
                src={
                  tutor.photoURL ||
                  "https://img.icons8.com/fluency/96/user-male-circle.png"
                }
                alt={tutor.name}
                className="w-25 h-25 rounded-full object-cover border-2 border-primary"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{tutor.name}</h3>
                  {tutor.tutorStatus === "approved" ? (
                    <MdVerified
                      className="text-success text-xl"
                      title="Verified Tutor"
                    />
                  ) : tutor.tutorStatus === "pending" ? (
                    <PiSealWarningFill
                      className="text-warning text-xl"
                      title="Verified Tutor"
                    />
                  ) : tutor.tutorStatus === "rejected" ? (
                    <MdCancel
                      className="text-error text-xl"
                      title="Verified Tutor"
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <p className="text-sm opacity-70 flex items-center gap-2">
                  {" "}
                  <span className="text-primary">
                    <AiTwotoneMail />
                  </span>{" "}
                  {tutor.email}
                </p>
                {tutor.phone && (
                  <p className="text-sm opacity-70 flex items-center gap-2">
                    {" "}
                    <span className="text-primary">
                      <GrPhone />
                    </span>{" "}
                    {tutor.phone}
                  </p>
                )}

                <div className="mt-2 flex gap-2">
                  <span
                    className={`badge badge-sm rounded-full ${
                      tutor.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {tutor.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="badge badge-sm rounded-full badge-outline badge-primary">
                    Tutor
                  </span>
                </div>
              </div>
            </div>

            <div className="divider divider-primary" />

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-primary">
                      <FaUserGraduate size={15} />
                    </span>
                    Qualifications
                  </h4>
                  <p className="text-sm opacity-80 mt-1">
                    {tutor.qualifications || "—"}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-primary">
                      <MdWorkHistory />
                    </span>{" "}
                    Experience
                  </h4>
                  <p className="text-sm opacity-80 mt-1">
                    {tutor.experience || "—"}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {" "}
                    <span className="text-primary">
                      <MdSubject />
                    </span>
                    Subjects
                  </h4>
                  {tutor.subjects?.length ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tutor.subjects.map((s, idx) => (
                        <span
                          key={idx}
                          className="badge badge-secondary badge-sm rounded-full text-gray-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm opacity-70">—</p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-primary">
                      <PiMoney />
                    </span>{" "}
                    Expected Salary
                  </h4>
                  <p className="text-lg font-bold">
                    ৳{" "}
                    <span className="text-primary">
                      {tutor.expectedSalary?.toLocaleString() || "—"}
                    </span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-1">
                    <span className="text-primary">
                      <MdOutlineDescription size={16} />
                    </span>
                    About
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed ">
                    {tutor.bio || "No bio provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-action">
              <button
                className="btn btn-primary rounded-full text-white hover:bg-secondary hover:text-gray-800"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default TutorProfileModal;
