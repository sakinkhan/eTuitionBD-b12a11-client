import React from "react";
import { AiFillCloseCircle, AiTwotoneMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { PiSealWarningFill, PiStudentBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { VscVerifiedFilled } from "react-icons/vsc";

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
    status,
  } = post;

  return (
    <div className="card w-65 md:w-80 h-100 mx-auto bg-linear-to-tr from-accent/90 via-accent/30 to-accent/90 shadow-sm rounded-3xl overflow-hidden flex flex-col border border-primary">
      <div className="card-body flex flex-col justify-between h-full">
        <div>
          <span className="badge badge-sm badge-warning flex items-center gap-1 max-w-[130px] truncate">
            <FaLocationDot className="shrink-0" />
            <span className="truncate">{location}</span>
          </span>

          {/* Status Icon */}
          {status === "admin-approved" && (
            <VscVerifiedFilled
              className="absolute top-5 right-5 text-success size-7 tooltip tooltip-primary"
              data-tip="Approved Post"
            />
          )}
          <div className="mt-2">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl line-clamp-2">
              {subject}
            </h2>
            <span className="text-sm md:text-xl">
              {" "}
              <span className="text-primary font-semibold">
                ৳{budget.toLocaleString("en-GB")}/mo
              </span>
            </span>
          </div>
        </div>

        <div>
          <div className="mt-6 flex gap-2 text-sm items-center">
            <PiStudentBold className="text-primary" />
            <span className="truncate">{studentName}</span>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <AiTwotoneMail className="text-primary" />
            <span className="truncate">{contactEmail}</span>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <RiCalendarScheduleLine className="text-primary" />
            <span className="truncate">{schedule}</span>
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
