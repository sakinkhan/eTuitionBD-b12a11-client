import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrSend } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApplyModal = ({
  tutor,
  tuitionPostId,
  isOpen,
  onClose,
  onApplicationSuccess,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load readonly tutor info when modal opens
  useEffect(() => {
    if (!isOpen || !tutor) return;

    reset({
      name: tutor.displayName,
      email: tutor.email,
      qualifications: "",
      experience: "",
      expectedSalary: "",
    });
  }, [isOpen, tutor, reset]);

  if (!isOpen || !tutor) return null;

  // Submit handler
  const onSubmit = async (formData) => {
    try {
      const payload = {
        tuitionPostId,
        qualifications: formData.qualifications,
        experience: formData.experience,
        expectedSalary: Number(formData.expectedSalary),
      };

      await axiosSecure.post("/applications", payload);
      Swal.fire({
        title: "Tuition Application Submitted!",
        text: "Your tuition application has been submitted successfully.",
        icon: "success",
        customClass: {
          confirmButton:
            "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
        },
        buttonsStyling: false,
      });
      if (onApplicationSuccess) onApplicationSuccess();
      reset();
      onClose();
    } catch (err) {
      console.error("Application submission failed:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Failed to submit application",
        customClass: {
          confirmButton:
            "btn btn-primary text-white font-semibold rounded-full px-6 py-2 mb-2",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-2xl w-80 md:w-96 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-primary"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-xl font-bold mb-4">Apply for Tuition</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name (read-only) */}
          <div>
            <label className="label text-sm font-medium">Name</label>
            <input
              type="text"
              readOnly
              {...register("name")}
              className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              type="email"
              readOnly
              {...register("email")}
              className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="label text-sm font-medium">Qualifications</label>
            <textarea
              {...register("qualifications", {
                required: "Qualifications are required",
              })}
              rows={3}
              className="textarea textarea-bordered w-full rounded-2xl"
              placeholder="Your qualifications"
            ></textarea>

            {errors.qualifications && (
              <p className="text-red-500 text-sm">
                {errors.qualifications.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="label text-sm font-medium">Experience</label>
            <input
              type="text"
              {...register("experience", {
                required: "Experience is required",
              })}
              className="input input-bordered w-full rounded-full"
              placeholder="Your experience"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Expected Salary */}
          <div>
            <label className="label text-sm font-medium">Expected Salary</label>
            <input
              type="number"
              {...register("expectedSalary", {
                required: "Expected salary is required",
              })}
              className="input input-bordered w-full rounded-full"
              placeholder="Expected salary"
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-sm">
                {errors.expectedSalary.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-secondary shadow-md hover:shadow-lg 
              text-gray-800 border border-primary hover:text-white 
              px-6 py-3 rounded-full hover:bg-primary transition-all w-full"
          >
            Submit <GrSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
