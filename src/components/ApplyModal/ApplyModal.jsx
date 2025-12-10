import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

const ApplyModal = ({ isOpen, onClose, tutor }) => {
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare application data
    const applicationData = {
      name: tutor.name,
      email: tutor.email,
      qualifications,
      experience,
      expectedSalary,
      status: "Pending", // default status
    };

    console.log("Submitting application:", applicationData);

    // TODO: Send applicationData to backend API
    // fetch("/api/apply", { method: "POST", body: JSON.stringify(applicationData) })

    // Close modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-base-100 rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Apply for Tuition</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={tutor.name}
              readOnly
              className="w-full border px-3 py-2 rounded-full"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={tutor.email}
              readOnly
              className="w-full border px-3 py-2 rounded-full"
            />
          </div>
          <div>
            <label className="block font-medium">Qualifications</label>
            <input
              type="text"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-full"
              placeholder="Your qualifications"
            />
          </div>
          <div>
            <label className="block font-medium">Experience</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-full"
              placeholder="Your experience"
            />
          </div>
          <div>
            <label className="block font-medium">Expected Salary</label>
            <input
              type="number"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-full"
              placeholder="Expected salary"
            />
          </div>
          <button
            type="submit"
            className="btn bg-secondary shadow-md hover:shadow-lg text-gray-800 border border-primary hover:text-white px-6 py-3 rounded-full hover:bg-primary transition-all w-full"
          >
            Submit <GrSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
