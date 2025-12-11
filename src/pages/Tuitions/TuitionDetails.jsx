import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { IoChevronBack } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import { GrSend } from "react-icons/gr";
import ApplyModal from "../../components/ApplyModal/ApplyModal";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

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

  const { data: dbUser } = useQuery({
    queryKey: ["db-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only fetch if user is logged in
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !tuition) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <p className="text-xl text-red-500">
          Unable to load this tuition post.
        </p>
      </div>
    );
  }

  // date time formatting
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      {/* Buttons */}
      <div className="flex items-center justify-between mb-6">
        {/* Go Back */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="btn flex items-center gap-2 px-6 py-3 rounded-full
               bg-primary text-white hover:bg-secondary hover:text-gray-900
               dark:bg-primary dark:hover:bg-secondary
               shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <IoChevronBack size={18} />
            Go Back
          </button>
        </div>

        {/* Apply Button (Only for tutors) */}
        <div>
          {dbUser?.role === "tutor" && (
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={hasApplied}
                className={`btn px-6 py-3 rounded-full shadow-md transition-all flex items-center justify-center gap-2
                  ${
                    hasApplied
                      ? "bg-gray-400 border-gray-400 text-gray-700 cursor-not-allowed shadow-none hover:shadow-none hover:bg-gray-400 hover:text-gray-700"
                      : "bg-secondary border border-primary text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg"
                  }`}
              >
                {hasApplied ? "Already Applied" : "Apply"} <GrSend />
              </button>
            </div>
          )}
        </div>
        {/* Apply Modal opens upon Apply Button click */}
        <ApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tutor={user}
          tuitionPostId={tuition._id}
          onApplicationSuccess={() => setHasApplied(true)}
        />
      </div>

      {/* Main Card */}
      <div className="bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 p-8 rounded-2xl shadow-lg border border-primary">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b-2 border-primary pb-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subject(s)
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              {tuition.subject}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
            <p className="text-3xl font-bold">
              ৳ <span className="text-primary">{tuition.budget}</span>/mo
            </p>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
            <p className="text-lg font-semibold">{tuition.location}</p>
          </div>

          {/* Class Level */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Class / Grade
            </p>
            <p className="text-lg font-semibold">{tuition.classLevel}</p>
          </div>

          {/* Student Name */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Student Name
            </p>
            <p className="font-medium">{tuition.studentName}</p>
          </div>
          {/* Contact */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Contact Email
            </p>
            <p className="font-medium">{tuition.contactEmail}</p>
          </div>
          {/* Schedule */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Schedule</p>
            <p className="font-medium">{tuition.schedule || "Not provided"}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Description
          </p>
          <p className="mt-2 leading-relaxed text-[16px]">
            {tuition.description}
          </p>
        </div>

        {/* Dates */}
        <div className="border-t-2 border-primary mt-10 pt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>Posted: {formatDate(tuition.createdAt)}</p>

          {tuition.updatedAt && (
            <p>Last Updated: {formatDate(tuition.updatedAt)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
