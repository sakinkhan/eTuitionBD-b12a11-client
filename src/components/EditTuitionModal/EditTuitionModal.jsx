import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const EditTuitionModal = ({
  tuition,
  isOpen,
  onClose,
  onSave,
  axiosSecure,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subject: "",
      classLevel: "",
      location: "",
      budget: "",
      schedule: "",
      description: "",
      contactEmail: "",
    },
  });

  // Update form values when tuition changes
  useEffect(() => {
    if (tuition) {
      reset({
        subject: tuition.subject || "",
        classLevel: tuition.classLevel || "",
        location: tuition.location || "",
        budget: tuition.budget || "",
        schedule: tuition.schedule || "",
        description: tuition.description || "",
        contactEmail: tuition.contactEmail || "",
      });
    }
  }, [tuition, reset]);
  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/tuition-posts/${tuition._id}`, data);
      onSave();
      onClose();
      Swal.fire({
        title: "Tuition Post Updated!",
        text: "Your tuition post has been updated successfully.",
        icon: "success",
        customClass: {
          confirmButton:
            "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
        },
        buttonsStyling: false,
      });
    } catch (err) {
      console.error(err.response?.data);
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

  // Conditional rendering of modal
  if (!isOpen || !tuition) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-primary"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-xl font-bold mb-4">Edit Tuition Post</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full rounded-full"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-medium">Class</label>
              <input
                type="text"
                placeholder="Class"
                className="input input-bordered w-full rounded-full"
                {...register("classLevel", { required: "Class is required" })}
              />
              {errors.classLevel && (
                <p className="text-red-500 text-sm">
                  {errors.classLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full rounded-full"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
          <div className="flex items-center gap-2">
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium">Budget (BDT)</label>
              <input
                type="number"
                placeholder="e.g. 7000"
                className="input input-bordered w-full rounded-full"
                {...register("budget", {
                  required: "Budget is required",
                  min: { value: 0, message: "Budget must be positive" },
                })}
              />
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium">Schedule</label>
              <input
                type="text"
                placeholder="e.g. Tue, Thu, Sat 5:00PM - 7:00PM"
                className="input input-bordered w-full rounded-full"
                {...register("schedule")}
              />
            </div>
          </div>

          {/* Description */}
          <label className="block text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the tuition needs, topics, expectations..."
            rows="4"
            className="textarea textarea-bordered w-full rounded-3xl"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Contact Email */}
          <label className="block text-sm font-medium">Contact Email</label>
          <input
            type="email"
            placeholder="Contact Email"
            className="input input-bordered w-full rounded-full"
            {...register("contactEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm">
              {errors.contactEmail.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary text-white rounded-full mt-2 hover:bg-secondary hover:text-gray-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTuitionModal;
