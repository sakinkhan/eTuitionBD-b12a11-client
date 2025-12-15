import React from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { RiCalendarScheduleLine } from "react-icons/ri";

const LatestTuitionCard = ({ post }) => {
  const navigate = useNavigate();
  const {
    _id,
    budget,
    contactEmail,
    studentName,
    subject,
    location,
    schedule,
  } = post;

  return (
    <div className="card w-65 md:w-75 h-100 mx-auto bg-linear-to-tr from-accent/90 via-accent/30 to-accent/90 shadow-sm rounded-3xl overflow-hidden flex flex-col border border-primary">
      <div className="card-body flex flex-col justify-between h-full">
        <div>
          <span className="badge badge-sm badge-warning flex items-center gap-1">
            <FaLocationDot />
            {location}
          </span>
          <div className="mt-2">
            <h2 className="text-3xl font-bold">{subject}</h2>
            <span className="text-xl">৳{budget}/mo</span>
          </div>
        </div>

        <div>
          <div className="mt-6 flex gap-2 text-sm items-center">
            <PiStudentBold className="text-primary" />
            {studentName}
          </div>
          <div className="flex gap-2 text-sm items-center">
            <AiTwotoneMail className="text-primary" />
            {contactEmail}
          </div>
          <div className="flex gap-2 text-sm items-center">
            <RiCalendarScheduleLine className="text-primary" />
            {schedule}
          </div>
          <div className="mt-6">
            <Link
              onClick={() => navigate(`/tuition/${_id}`)}
              className="btn w-full rounded-full text-white font-semibold text-lg bg-primary hover:bg-secondary hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestTuitionCard;
