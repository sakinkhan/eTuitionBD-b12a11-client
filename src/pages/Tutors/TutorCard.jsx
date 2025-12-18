import React from "react";
import { FaUserGraduate } from "react-icons/fa6";

const TutorCard = ({ tutor }) => {
  console.log(tutor);
  return (
    <div className="bg-accent rounded-xl border border-primary hover:shadow-lg transition p-6 flex flex-col items-center text-center">
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
    </div>
  );
};

export default TutorCard;
