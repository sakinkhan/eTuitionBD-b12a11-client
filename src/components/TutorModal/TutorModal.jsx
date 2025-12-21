import React from "react";

const TutorModal = ({ isOpen, onClose, application }) => {
  if (!isOpen || !application) return null;
  console.log(application);

  return (
    <dialog open className="modal">
      <div className="modal-box rounded-3xl max-w-md space-y-4">
        <h3 className="text-xl font-bold mb-3">Tutor Details</h3>

        <div className="flex flex-col items-center gap-3">
          <img
            src={application.tutorPhoto}
            alt="Tutor"
            className="w-24 h-24 rounded-full border"
          />
          <p className="text-lg font-semibold">{application.tutorName}</p>
        </div>
        <div className="divider divider-primary"></div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Qualifications:</span>{" "}
            {application.qualifications}
          </p>

          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {application.experience}
          </p>

          <p>
            <span className="font-semibold">Expected Salary:</span> ৳
            {application.expectedSalary}
          </p>

          <p>
            <span className="font-semibold">Contact Email:</span>{" "}
            {application.tutorEmail}
          </p>
          <p>
            <span className="font-semibold">Applied on:</span>{" "}
            {new Date(application.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-primary text-white rounded-full hover:bg-secondary hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TutorModal;
