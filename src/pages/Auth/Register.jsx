import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { registerUser, user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email & Password Registration
  const handleRegistration = async (data) => {
    // Validate photo
    if (!data.photo || !data.photo[0]) {
      toast.error("Photo is required");
      return;
    }

    const profileImg = data.photo[0];

    try {
      setLoading(true);

      // 1. Register user in Firebase
      const result = await registerUser(data.email, data.password);
      console.log("User registered:", result.user);

      // 2. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);

      const img_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const uploadRes = await axios.post(img_API_URL, formData);
      const photoURL = uploadRes.data.data.url;

      // 3. Update Firebase display name + photo
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4. Prepare unified user object
      const userToSave = {
        name: data.name,
        email: data.email,
        phone: data.phone?.trim() || "",
        role: data.role === "tutor" ? "tutor" : "student",
        isAdmin: false,
        verified: false,
        photoURL,
        createdAt: new Date(),
      };

      // 5. Save user to backend DB
      await axiosSecure.post("/users", userToSave);

      toast.success("Account created successfully!");
      navigate(location.state || "/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // If already logged in
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-center">
        <p className="text-4xl md:text-5xl font-bold text-primary">
          You are already logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center md:w-120">
      <title>eTuitionBD - Register</title>
      <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl shadow-2xl py-8 px-10 rounded-3xl border-2 bg-accent-content/70 border-primary">
        <h1 className="text-3xl font-bold text-primary">Create Account</h1>
        <p className="text-base-content">
          Fill in your details to get started.
        </p>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="mt-6 font-secondary"
        >
          {/* Name field*/}
          <label className="label text-[16px] text-base-content" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full text-[16px] rounded-full"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {/* Photo image field */}
          <fieldset className="fieldset">
            <label
              className="label text-[16px] text-base-content"
              htmlFor="photo"
            >
              Profile Image
            </label>
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required",
                validate: {
                  fileType: (files) => {
                    const file = files[0];
                    if (!file) return "Photo is required";
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                    ];
                    return (
                      allowedTypes.includes(file.type) ||
                      "Only JPG, PNG or GIF images are allowed"
                    );
                  },
                  fileSize: (files) => {
                    const file = files[0];
                    if (!file) return "Photo is required";
                    const maxSizeInBytes = 2 * 1024 * 1024;
                    return (
                      file.size <= maxSizeInBytes || "Max file size is 2MB"
                    );
                  },
                },
              })}
              className="file-input w-full rounded-full"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setPreview(null);
                }
              }}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
            <label className="label">PNG, JPG or JPEG (Max 2MB)</label>

            {/* Image preview */}
            {preview && (
              <div className="mt-2">
                <p className="text-[16px] mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 md:w-40 h-32 md:h-40 object-cover rounded-full border-2 border-primary mx-auto"
                />
              </div>
            )}
          </fieldset>

          {/* Role selection field */}
          <label className="label text-[16px] text-base-content" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className="select select-bordered w-full rounded-full mb-2"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}

          {/* Phone number field */}
          <label
            className="label text-[16px] text-base-content"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{10,15}$/,
                message:
                  "Invalid phone number. Only digits allowed, 10-15 digits.",
              },
            })}
            className="input input-bordered w-full text-[16px] rounded-full mb-2"
            placeholder="Your Phone Number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}

          {/* Email field */}
          <label
            className="label text-[16px] text-base-content"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="input input-bordered w-full text-[16px] rounded-full mb-2"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password field */}
          <label
            className="label text-[16px] text-base-content"
            htmlFor="password"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  message: "Must include uppercase, lowercase, and a number",
                },
              })}
              className="input input-bordered w-full text-[16px] rounded-full pr-10"
              placeholder="Your Password"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-base-content"
            >
              {showPassword ? <IoIosEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Terms */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              className="checkbox checkbox-primary"
              required
            />
            <label
              htmlFor="terms"
              className="text-[16px] text-primary cursor-pointer"
            >
              Accept Terms & Conditions
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full mt-5 border-0 text-[16px] rounded-full ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"
            } bg-primary text-black`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login link */}
          <p className="py-3 text-center font-semibold text-[16px]">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Google */}
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
