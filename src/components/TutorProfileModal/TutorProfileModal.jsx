import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MdAccessTime,
  MdCancel,
  MdOutlineDescription,
  MdSubject,
  MdVerified,
  MdWorkHistory,
} from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { PiMoney, PiSealWarningFill } from "react-icons/pi";
import { AiTwotoneMail } from "react-icons/ai";
import { GrPhone } from "react-icons/gr";
import LoadingLottie from "../Lotties/LoadingLottie";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TutorProfileModal = ({ isOpen, onClose, tutorId, application }) => {
  const axiosSecure = useAxiosSecure();
  const isApplicationMode = !!application;
  const resolvedTutorId = tutorId || application?.tutorId;

  const {
    data: fetchedTutor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutor-profile", resolvedTutorId],
    enabled: !!resolvedTutorId && isOpen,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${resolvedTutorId}`);
      return res.data.tutor;
    },
  });

  if (!isOpen) return null;

  const tutor = isApplicationMode
    ? {
        // Application fields
        name: application.tutorName,
        photoURL: application.tutorPhoto || fetchedTutor?.photoURL,
        email: application.tutorEmail,
        phone: application.tutorPhone || fetchedTutor?.phone,
        qualifications: application.qualifications,
        experience: application.experience,
        expectedSalary: application.expectedSalary,
        appliedAt: application.createdAt,

        // Profile-only fields
        bio: fetchedTutor?.bio,
        subjects: fetchedTutor?.subjects,
        tutorStatus: fetchedTutor?.tutorStatus,
      }
    : fetchedTutor;

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box max-w-xl md:max-w-3xl p-9 rounded-3xl">
        {/* Loading */}
        {isLoading && !isApplicationMode && (
          <div className="py-20 flex justify-center">
            <LoadingLottie />
          </div>
        )}

        {/* Error */}
        {isError && !isApplicationMode && (
          <div className="text-center py-10 text-error">
            Failed to load tutor profile.
          </div>
        )}

        {/* Content */}
        {tutor && (
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

                  {!isApplicationMode && tutor.tutorStatus === "approved" && (
                    <MdVerified className="text-success text-xl" />
                  )}

                  {!isApplicationMode && tutor.tutorStatus === "pending" && (
                    <PiSealWarningFill className="text-warning text-xl" />
                  )}

                  {!isApplicationMode && tutor.tutorStatus === "rejected" && (
                    <MdCancel className="text-error text-xl" />
                  )}
                </div>

                <p className="text-sm opacity-70 flex items-center gap-2">
                  <span className="text-primary">
                    <AiTwotoneMail />
                  </span>
                  {tutor.email}
                </p>

                {tutor.phone && (
                  <p className="text-sm opacity-70 flex items-center gap-2">
                    <span className="text-primary">
                      <GrPhone />
                    </span>
                    {tutor.phone}
                  </p>
                )}

                <div className="mt-2 flex gap-2">
                  <span className="badge badge-sm rounded-full badge-outline badge-primary">
                    Tutor
                  </span>

                  {isApplicationMode && (
                    <span className="badge badge-sm rounded-full badge-secondary text-gray-800">
                      Application
                    </span>
                  )}
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
                    </span>
                    Experience
                  </h4>
                  <p className="text-sm opacity-80 mt-1">
                    {tutor.experience || "—"}
                  </p>
                </div>

                {!isApplicationMode && tutor.subjects?.length && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="text-primary">
                        <MdSubject />
                      </span>
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tutor.subjects.map((s, idx) => (
                        <span
                          key={idx}
                          className="badge badge-secondary text-gray-800 badge-sm rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {isApplicationMode && tutor.appliedAt && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="text-primary">
                        <MdAccessTime size={16} />
                      </span>
                      Applied On
                    </h4>
                    <p className="text-sm opacity-80">
                      {new Date(tutor.appliedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-primary">
                      <PiMoney />
                    </span>
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
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="text-primary">
                      <MdOutlineDescription size={16} />
                    </span>
                    About
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed">
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
