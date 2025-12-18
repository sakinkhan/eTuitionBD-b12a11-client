import React from "react";
import { FaUserGraduate } from "react-icons/fa6";
import { VscVerifiedFilled } from "react-icons/vsc";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-linear-to-br from-accent/90 via-accent/30 to-accent/90 rounded-xl border border-primary hover:shadow-lg p-6 flex flex-col items-center text-center relative hover:scale-105 transition-transform duration-300">
      {tutor.verified && (
        <div className="absolute top-3 right-3">
          <VscVerifiedFilled className="size-5 text-success" />
        </div>
      )}
      <img
        src={
          tutor?.photoURL ||
          "https://img.icons8.com/?size=96&id=23264&format=png"
        }
        alt={tutor.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-4"
      />

      <h3 className="text-lg font-semibold text-base-content">{tutor.name}</h3>

      <p className="text-sm text-base-content/60 mb-3">{tutor.email}</p>

      <div className="flex items-center gap-2 text-primary text-sm font-medium">
        <FaUserGraduate />
        Tutor
      </div>
      <button className="btn btn-sm btn-primary rounded-full mt-3 hover:bg-secondary hover:text-gray-700">
        View Details
      </button>
    </div>
  );
};

export default TutorCard;
