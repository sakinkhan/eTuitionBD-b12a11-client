import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import { IoChevronBack } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import { VscVerifiedFilled } from "react-icons/vsc";
import { PiSealWarningFill } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";

import ApplyModal from "../../components/ApplyModal/ApplyModal";
import LoadingLottie from "../../components/Lotties/LoadingLottie";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔐 Private page guard
  if (!authLoading && !user) {
    navigate("/auth/login", { replace: true });
  }

  /* -------------------- Tuition -------------------- */
  const {
    data: tuitionData,
    isLoading: tuitionLoading,
    isError,
  } = useQuery({
    queryKey: ["tuition-details", id],
    enabled: !!id && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-posts/${id}`);
      return res.data;
    },
  });

  const tuition = tuitionData?.post || null;

  /* -------------------- DB User -------------------- */
  const { data: dbUser } = useQuery({
    queryKey: ["db-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.user || null;
    },
  });

  const isTutor = dbUser?.role === "tutor";

  /* -------------------- Tutor Profile -------------------- */
  const { data: tutorProfile, isLoading: tutorLoading } = useQuery({
    queryKey: ["tutor-me"],
    enabled: isTutor,
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/me");
      return res.data?.tutor || null;
    },
  });

  /* -------------------- Applications -------------------- */
  const {
    data: myApplications = [],
    isLoading: appsLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["my-applications"],
    enabled: isTutor,
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/my-applications", {
        params: { page: 1, limit: 1000 },
      });
      return res.data?.applications || [];
    },
  });

  /* -------------------- hasApplied -------------------- */
  const hasApplied = useMemo(() => {
    if (!isTutor || !tuition?._id) return false;

    return myApplications.some(
      (app) =>
        String(
          app.tuitionPost?._id || app.tuitionPostId?._id || app.tuitionPostId
        ) === String(tuition._id)
    );
  }, [isTutor, myApplications, tuition?._id]);

  /* -------------------- Button state -------------------- */
  const tutorStatus = tutorProfile?.tutorStatus;

  const buttonState = useMemo(() => {
    if (!isTutor) return null;
    if (!tutorProfile) return "COMPLETE_PROFILE";
    if (hasApplied) return "APPLIED";
    if (tutorStatus === "pending") return "PENDING";
    if (tutorStatus === "rejected") return "REJECTED";
    if (tutorStatus === "approved") return "APPLY";
    return null;
  }, [isTutor, tutorProfile, hasApplied, tutorStatus]);

  const canApply = buttonState === "APPLY";

  /* -------------------- Loading -------------------- */
  if (
    authLoading ||
    tuitionLoading ||
    (isTutor && (tutorLoading || appsLoading))
  ) {
    return <LoadingLottie />;
  }

  if (isError || !tuition) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl text-red-500">Unable to load tuition post.</p>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn flex items-center gap-2 px-6 py-3 rounded-full
            bg-primary text-white hover:bg-secondary hover:text-gray-900"
        >
          <IoChevronBack size={18} />
          Go Back
        </button>

        {isTutor && (
          <button
            onClick={() => canApply && setIsModalOpen(true)}
            disabled={!canApply}
            className={`btn px-6 py-3 rounded-full flex items-center gap-2
              ${
                canApply
                  ? "bg-secondary text-gray-800 hover:bg-primary hover:text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
          >
            {
              {
                APPLY: "Apply",
                APPLIED: "Already Applied",
                PENDING: "Approval Pending",
                REJECTED: "Approval Rejected",
                COMPLETE_PROFILE: "Complete Tutor Profile",
              }[buttonState]
            }
            <GrSend />
          </button>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tutor={user}
        tutorProfile={tutorProfile}
        tuitionPostId={tuition._id}
        onApplicationSuccess={() => {
          refetchApplications();
          setIsModalOpen(false);
        }}
      />

      {/* Tuition Card */}
      <div className="bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 p-8 rounded-2xl border border-primary">
        <div className="relative border-b-2 border-primary pb-6 mb-6 pt-8">
          <span className="absolute top-0 left-0 badge badge-info badge-sm">
            {tuition.tuitionCode}
          </span>

          {tuition.status === "admin-approved" && (
            <VscVerifiedFilled className="absolute top-0 right-0 text-success size-7" />
          )}
          {tuition.status === "admin-pending" && (
            <PiSealWarningFill className="absolute top-0 right-0 text-warning size-7" />
          )}
          {tuition.status === "admin-rejected" && (
            <AiFillCloseCircle className="absolute top-0 right-0 text-error size-7" />
          )}

          <div className="flex justify-between items-end gap-4">
            <h1 className="text-3xl font-bold">{tuition.subject}</h1>
            <p className="text-3xl font-bold flex items-center gap-1">
              ৳<span className="text-primary">{tuition.budget}</span>/mo
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Info label="Location" value={tuition.location} />
          <Info label="Class / Grade" value={tuition.classLevel} />
          <Info label="Student Name" value={tuition.studentName} />
          <Info label="Contact Email" value={tuition.contactEmail} />
          <Info label="Schedule" value={tuition.schedule || "Not provided"} />
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-2">{tuition.description}</p>
        </div>

        <div className="border-t-2 border-primary mt-10 pt-4 text-sm text-gray-500">
          <p>Posted: {formatDate(tuition.createdAt)}</p>
          {tuition.updatedAt && <p>Updated: {formatDate(tuition.updatedAt)}</p>}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default TuitionDetails;
