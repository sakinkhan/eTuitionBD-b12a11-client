import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApplyModal = ({
  isOpen,
  onClose,
  tutor,
  tutorProfile,
  tuitionPostId,
  application,
  onApplicationSuccess,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!isOpen) return;

    // priority: application -> tutorProfile -> empty
    reset({
      name: tutor?.displayName || "",
      email: tutor?.email || "",
      qualifications:
        application?.qualifications ?? tutorProfile?.qualifications ?? "",
      experience: application?.experience ?? tutorProfile?.experience ?? "",
      expectedSalary:
        application?.expectedSalary ?? tutorProfile?.expectedSalary ?? "",
    });
  }, [isOpen, application, tutorProfile, tutor, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const payload = {
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: Number(data.expectedSalary),
    };

    try {
      // CREATE
      if (!application) {
        await axiosSecure.post("/applications", {
          ...payload,
          tuitionPostId,
        });

        Swal.fire({
          title: "Application Submitted!",
          text: "Your tuition application has been submitted successfully.",
          icon: "success",
          customClass: {
            confirmButton:
              "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
          },
          buttonsStyling: false,
        });
      }

      // EDIT
      else {
        const res = await axiosSecure.patch(
          `/applications/tutor-update/${application._id}`,
          payload
        );

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Application Updated!",
            text: "Your tuition application has been updated successfully.",
            icon: "success",
            customClass: {
              confirmButton:
                "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
            },
            buttonsStyling: false,
          });
        }
      }

      onApplicationSuccess?.();
      onClose();
    } catch (err) {
      console.error("Apply submit error:", err.response || err);
      const message = err.response?.data?.error;

      if (message === "Already applied to this tuition") {
        Swal.fire({
          title: "Already Applied",
          text: "You have already applied for this tuition.",
          icon: "info",
          customClass: {
            confirmButton:
              "btn btn-primary text-white font-semibold rounded-full px-6 py-2 mb-2",
          },
          buttonsStyling: false,
        });

        onApplicationSuccess?.();
        onClose();
        return;
      }

      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later.",
        icon: "error",
        customClass: {
          confirmButton:
            "btn btn-primary text-white font-semibold rounded-full px-6 py-2 mb-2",
        },
        buttonsStyling: false,
      });

      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-2xl w-80 md:w-96 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-primary"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-xl font-bold mb-4">
          {application ? "Edit Application" : "Apply for Tuition"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <label className="label text-sm">Name</label>
          <input
            readOnly
            {...register("name")}
            className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
          />

          {/* Email */}
          <label className="label text-sm">Email</label>
          <input
            readOnly
            {...register("email")}
            className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
          />

          {/* Qualifications */}
          <label className="label text-sm">Qualifications</label>
          <textarea
            {...register("qualifications", { required: "Required" })}
            className="textarea textarea-bordered w-full rounded-xl"
            rows="3"
          />
          {errors.qualifications && (
            <p className="text-red-500 text-sm">
              {errors.qualifications.message}
            </p>
          )}

          {/* Experience */}
          <label className="label text-sm">Experience</label>
          <input
            {...register("experience", { required: "Required" })}
            className="input input-bordered w-full rounded-full"
          />

          {/* Expected Salary */}
          <label className="label text-sm">Expected Salary</label>
          <input
            type="number"
            {...register("expectedSalary", {
              required: "Required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            className="input input-bordered w-full rounded-full"
          />
          {errors.expectedSalary && (
            <p className="text-red-500 text-sm">
              {errors.expectedSalary.message}
            </p>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn bg-secondary text-gray-800 border border-primary hover:bg-primary 
              hover:text-white w-full rounded-full mt-3"
          >
            {application ? "Save Changes" : "Submit"} <GrSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
