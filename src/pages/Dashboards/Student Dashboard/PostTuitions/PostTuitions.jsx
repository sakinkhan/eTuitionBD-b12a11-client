import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PostTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
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
      contactEmail: user?.email || "",
    },
  });

  const handlePostTuition = (data) => {
    Swal.fire({
      title: "Tuition Post Created",
      text: "Your request is now submitted and waiting for admin approval.",
      icon: "success",
      customClass: {
        confirmButton:
          "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/tuition-post", data).then((res) => {
          console.log("after saving tuition post", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-tuitions");
          }
        });
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-accent/60 rounded-xl shadow-lg my-5">
      <h2 className="text-2xl font-semibold mb-4">
        Post a <span className="text-primary">Tuition</span>
      </h2>
      <form onSubmit={handleSubmit(handlePostTuition)} className="space-y-4">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium">Subject(s)</label>
          <input
            {...register("subject", { required: "Subject is required" })}
            className="w-full input rounded-full"
            placeholder="e.g. Computer Science"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium">Class / Grade</label>
          <input
            {...register("classLevel", { required: "Class is required" })}
            className="w-full input rounded-full"
            placeholder="e.g. 12"
          />
          {errors.classLevel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classLevel.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full input rounded-full"
            placeholder="e.g. Dhaka, Gulshan"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium">Budget (BDT)</label>
          <input
            {...register("budget", {
              required: "Budget is required",
              min: { value: 0, message: "Budget must be positive" },
            })}
            type="number"
            className="w-full input rounded-full"
            placeholder="e.g. ৳7000"
          />
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium">Schedule</label>
          <input
            {...register("schedule", { required: "Schedule is required" })}
            className="w-full input rounded-full"
            placeholder="e.g. Tue, Thu, Sat 5:00PM - 7:00PM"
          />
          {errors.schedule && (
            <p className="text-red-500 text-sm mt-1">
              {errors.schedule.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full textarea rounded-3xl"
            rows="4"
            placeholder="Describe the tuition needs, topics, expectations..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium">Contact Email</label>
          <input
            {...register("contactEmail", { required: "Email required" })}
            className="w-full input rounded-full"
            placeholder="you@example.com"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn btn-primary text-white rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Tuition"}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-primary text-white rounded-full"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>

        {/* {serverError && <p className="text-sm text-red-600">{serverError}</p>} */}
      </form>
    </div>
  );
};

export default PostTuitions;
