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
  tuitionPostId,
  application,
  onApplicationSuccess,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Pre-fill form (edit or create)
  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: tutor?.displayName || "",
      email: tutor?.email || "",
      qualifications: application?.qualifications || "",
      experience: application?.experience || "",
      expectedSalary: application?.expectedSalary || "",
    });
  }, [isOpen, application, tutor, reset]);

  if (!isOpen) return null;

  // Handle submit
  const onSubmit = async (data) => {
    try {
      const payload = {
        qualifications: data.qualifications,
        experience: data.experience,
        expectedSalary: Number(data.expectedSalary),
      };

      // CREATE NEW
      if (!application) {
        await axiosSecure
          .post("/applications", {
            ...payload,
            tuitionPostId,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.applicationId) {
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
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // EDIT EXISTING
      else {
        await axiosSecure
          .patch(`/applications/tutor-update/${application._id}`, payload)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Application Updated!",
                text: "Your tuition Application has been updated successfully.",
                icon: "success",
                customClass: {
                  confirmButton:
                    "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
                },
                buttonsStyling: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (onApplicationSuccess) onApplicationSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
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
          {/* Read-only name */}
          <label className="label text-sm">Name</label>
          <input
            type="text"
            {...register("name")}
            readOnly
            className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
          />

          {/* Read-only email */}
          <label className="label text-sm">Email</label>
          <input
            type="email"
            {...register("email")}
            readOnly
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
            type="text"
            {...register("experience", { required: "Required" })}
            className="input input-bordered w-full rounded-full"
          />

          {/* Expected Salary */}
          <label className="label text-sm">Expected Salary</label>
          <input
            type="number"
            {...register("expectedSalary", { required: "Required" })}
            className="input input-bordered w-full rounded-full"
          />

          <button
            type="submit"
            className="btn bg-secondary text-gray-800 border border-primary hover:bg-primary 
              hover:text-white transition-all w-full rounded-full mt-3"
          >
            {application ? "Save Changes" : "Submit"} <GrSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
