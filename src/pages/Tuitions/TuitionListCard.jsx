import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router";

const TuitionListCard = ({ t }) => {
  const {
    _id,
    budget,
    classLevel,
    createdAt,
    location,
    studentName,
    subject,
    contactEmail,
    schedule,
    tuitionCode,
    status,
  } = t;
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] mb-6 border-2 border-primary">
      {/* Left Panel: Tuition Details */}
      <div className="flex-1 p-6 bg-linear-to-tl from-accent/90 via-accent/30 to-accent/90 dark:from-base-300 dark:via-base-100 dark:to-base-400">
        <div className="flex items-center justify-between">
          <p className="badge text-xs badge-info badge-xs rounded-full mb-2">
            {tuitionCode}
          </p>
          {status === "admin-approved" && (
            <p
              className="tooltip tooltip-primary tooltip-left"
              data-tip="Approved Post"
            >
              {" "}
              <VscVerifiedFilled className="text-success size-8" />
            </p>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
          {subject}
        </h2>

        <div className="flex flex-wrap gap-3 mb-9">
          <span className="flex items-center text-sm bg-secondary text-base-content dark:text-gray-800 px-3 py-1 rounded-full shadow-sm">
            <FaLocationDot className="mr-1" /> {location}
          </span>
          <span className="flex items-center text-sm bg-primary/80 text-base-content dark:text-gray-800 px-3 py-1 rounded-full shadow-sm">
            <FaChalkboardTeacher className="mr-1" /> Class {classLevel}
          </span>
          <span className="flex items-center text-sm bg-secondary text-base-content dark:text-gray-800 px-3 py-1 rounded-full shadow-sm">
            <FaClock className="mr-1" /> {schedule}
          </span>
        </div>

        <div className="space-y-1 text-base-content/90">
          <p className="flex items-center gap-1">
            <PiStudentBold></PiStudentBold> {studentName}
          </p>
          <p className="flex items-center gap-1">
            <MdEmail className="mr-1" />
            <span className="font-semibold mr-1">Email:</span> {contactEmail}
          </p>
          <p>
            <span className="font-semibold">Posted on:</span>{" "}
            {new Date(createdAt).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right Panel: Budget & Button */}
      <div className="flex flex-col justify-center items-center md:items-end p-6 bg-base-200 border-t md:border-t-0 md:border-l border-secondary w-full md:w-56">
        <div className="mx-auto">
          <label className="text-gray-500">Budget</label>
          <div className="text-3xl font-extrabold text-primary text-center mx-auto mb-10">
            ৳{budget}
          </div>
        </div>
        <Link
          to={`/tuition/${_id}`}
          className="w-full md:w-40 py-2 px-4 bg-primary text-white font-semibold rounded-full text-center hover:bg-secondary hover:text-base-content transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TuitionListCard;
