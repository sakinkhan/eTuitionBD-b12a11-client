import React, { useState } from "react";
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
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------------- Tuition Details ---------------- */
  const {
    data: tuition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuition-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-posts/${id}`);
      return res.data;
    },
  });

  /* ---------------- Logged-in DB User ---------------- */
  const { data: dbUser } = useQuery({
    queryKey: ["db-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.user || null;
    },
  });

  /* ---------------- My Applications ---------------- */
  const {
    data: myApplications = [],
    isLoading: appsLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/my-applications", {
        params: { page: 1, limit: 1000 },
      });
      return res.data?.applications || [];
    },
  });

  const hasApplied = myApplications.some(
    (app) => String(app.tuitionPostId) === String(tuition?._id)
  );

  /* ---------------- Loading / Error ---------------- */
  if (isLoading || appsLoading) return <LoadingLottie />;

  if (isError || !tuition) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <p className="text-xl text-red-500">
          Unable to load this tuition post.
        </p>
      </div>
    );
  }

  /* ---------------- Helpers ---------------- */
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handleApplyClick = () => {
    if (hasApplied) return;
    setIsModalOpen(true);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      {/* Header Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn flex items-center gap-2 px-6 py-3 rounded-full
            bg-primary text-white hover:bg-secondary hover:text-gray-900
            shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <IoChevronBack size={18} />
          Go Back
        </button>

        {dbUser?.role === "tutor" && (
          <button
            onClick={handleApplyClick}
            disabled={hasApplied}
            className={`btn px-6 py-3 rounded-full shadow-md transition-all flex items-center gap-2
              ${
                hasApplied
                  ? "bg-gray-400 border-gray-400 text-gray-700 cursor-not-allowed shadow-none"
                  : "bg-secondary border border-primary text-gray-800 hover:bg-primary hover:text-white"
              }`}
          >
            {hasApplied ? "Already Applied" : "Apply"}
            <GrSend />
          </button>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tutor={user}
        tuitionPostId={tuition._id}
        onApplicationSuccess={() => {
          refetchApplications();
          setIsModalOpen(false);
        }}
      />

      {/* Main Card */}
      <div className="bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 p-8 rounded-2xl shadow-lg border border-primary">
        {/* Header */}
        <div className="relative border-b-2 border-primary pb-6 mb-6 pt-8">
          <span className="absolute top-0 left-0 badge badge-info badge-sm rounded-full">
            {tuition.tuitionCode}
          </span>

          {/* Status Icon */}
          {tuition.status === "admin-approved" && (
            <VscVerifiedFilled
              className="absolute top-0 right-0 text-success size-7 tooltip tooltip-primary"
              data-tip="Approved Post"
            />
          )}
          {tuition.status === "admin-pending" && (
            <PiSealWarningFill
              className="absolute top-0 right-0 text-warning size-7 tooltip tooltip-primary"
              data-tip="Pending Approval"
            />
          )}
          {tuition.status === "rejected" && (
            <AiFillCloseCircle
              className="absolute top-0 right-0 text-error size-7 tooltip tooltip-primary"
              data-tip="Rejected Post"
            />
          )}

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {tuition.subject}
            </h1>

            <div>
              <p className="text-gray-500">Budget</p>
              <p className="text-3xl font-bold">
                ৳ <span className="text-primary">{tuition.budget}</span>/mo
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Info label="Location" value={tuition.location} />
          <Info label="Class / Grade" value={tuition.classLevel} />
          <Info label="Student Name" value={tuition.studentName} />
          <Info label="Contact Email" value={tuition.contactEmail} />
          <Info label="Schedule" value={tuition.schedule || "Not provided"} />
        </div>

        {/* Description */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-2 leading-relaxed">{tuition.description}</p>
        </div>

        {/* Dates */}
        <div className="border-t-2 border-primary mt-10 pt-4 text-sm text-gray-500">
          <p>Posted: {formatDate(tuition.createdAt)}</p>
          {tuition.updatedAt && (
            <p>Last Updated: {formatDate(tuition.updatedAt)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Helper ---------------- */
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default TuitionDetails;
