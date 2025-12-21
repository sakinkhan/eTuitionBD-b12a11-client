import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const TutorProfileSetup = () => {
  const { profileCompleted } = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isFirstTime = profileCompleted === false;
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fetch tutor profile
  const { data: tutorProfile, isLoading } = useQuery({
    queryKey: ["tutor-profile", profileCompleted],
    enabled: !isFirstTime,
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors/me");
      return res.data.tutor;
    },
  });
  // Prefill form when profile loads
  useEffect(() => {
    if (tutorProfile) {
      reset(tutorProfile);
    }
  }, [tutorProfile, reset]);

  const queryClient = useQueryClient();

  const handleCreateTutorProfile = async (data) => {
    try {
      setSubmitting(true);

      if (isFirstTime) {
        await axiosSecure.post("/tutors", data);
      } else {
        await axiosSecure.patch("/tutors/me", data);
      }
      queryClient.invalidateQueries({
        queryKey: ["current-user", user?.email],
      });
      queryClient.invalidateQueries({ queryKey: ["tutor-profile"] });

      navigate("/dashboard");
      Swal.fire({
        title: isFirstTime
          ? "Tutor Profile Created!"
          : "Tutor Profile Updated!",
        text: isFirstTime
          ? "Your tutor profile has been created successfully."
          : "Your tutor profile has been updated successfully.",
        icon: "success",
        customClass: {
          confirmButton:
            "btn btn-success text-white font-semibold rounded-full px-6 py-2 mb-2",
        },
        buttonsStyling: false,
      });
    } catch (err) {
      console.error("Tutor profile save failed", err);
      // optionally show toast here
    } finally {
      setSubmitting(false);
    }
  };

  if (!isFirstTime && isLoading) {
    return <LoadingLottie />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-accent/60 rounded-xl shadow-lg my-5">
      <h2 className="text-2xl font-semibold mb-2">
        {isFirstTime ? (
          <>
            Complete Your <span className="text-primary">Tutor</span> Profile
          </>
        ) : (
          <>
            Update Your <span className="text-primary">Tutor</span> Profile
          </>
        )}
      </h2>

      <p className="text-sm text-base-content/70 mb-4">
        {isFirstTime
          ? "This information helps students find and trust you."
          : "Keep your profile up to date to attract more students."}
      </p>

      <form
        onSubmit={handleSubmit(handleCreateTutorProfile)}
        className="space-y-4"
      >
        {/* Qualifications */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Qualifications
          </label>
          <input
            {...register("qualifications", {
              required: "Qualifications are required",
            })}
            className="w-full input rounded-full"
            placeholder="e.g. BSc in Mathematics, MSc in Physics"
          />
          {errors.qualifications && (
            <p className="text-red-500 text-sm mt-1">
              {errors.qualifications.message}
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Teaching Experience
          </label>
          <input
            {...register("experience", {
              required: "Experience is required",
            })}
            className="w-full input rounded-full"
            placeholder="e.g. 5 years teaching HSC students"
          />
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Subjects
          </label>
          <input
            {...register("subjects", {
              required: "At least one subject is required",
            })}
            className="w-full input rounded-full"
            placeholder="e.g. Math, Physics, ICT"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Expected Salary (per month)
          </label>
          <input
            type="number"
            {...register("expectedSalary", {
              required: "Expected salary is required",
              min: { value: 0, message: "Salary must be positive" },
            })}
            className="w-full input rounded-full"
            placeholder="e.g. ৳7000"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">About You</label>
          <textarea
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 50,
                message: "Bio should be at least 50 characters",
              },
            })}
            className="w-full textarea rounded-3xl"
            placeholder="Tell students about your teaching style, strengths, and approach..."
            rows="4"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn rounded-full btn-primary text-white hover:bg-secondary hover:text-gray-800"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : isFirstTime
              ? "Start My Tutor Journey"
              : "Update Profile"}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-primary hover:text-white rounded-full"
            onClick={() => reset()}
            disabled={!isFirstTime}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorProfileSetup;
