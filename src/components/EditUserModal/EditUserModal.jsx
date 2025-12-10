import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [preview, setPreview] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load user data into form when modal opens
  useEffect(() => {
    if (!isOpen || !user) return;
    setTimeout(() => {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        verified: user.verified,
      });
      setImageLoaded(false);
      setPreview(user.photoURL || null);
    }, 0);
  }, [user, isOpen, reset]);

  if (!isOpen || !user) return null;

  // Upload image to imgbb
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const img_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    const uploadRes = await axios.post(img_API_URL, formData);
    return uploadRes.data.data.url;
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      let photoURL = user.photoURL;

      // only upload to imgBB if image changed
      if (data.photo && data.photo.length > 0) {
        photoURL = await uploadImageToImgBB(data.photo[0]);
      }

      // Final updated object
      const updatedUser = {
        name: data.name.trim(),
        phone: data.phone?.trim() || "",
        role: data.role,
        verified: data.verified,
        photoURL,
      };

      onSave(updatedUser);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-2xl w-80 md:w-96 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Phofile Preview */}
          <div className="flex justify-center mx-auto mt-3 w-28 h-28">
            {/* Placeholder while image is loading */}
            {preview && !imageLoaded && (
              <div className="w-28 h-28 rounded-full border-2 border-gray-300 bg-gray-200 animate-pulse"></div>
            )}
            {/* Actual preview image */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className={`w-28 h-28 rounded-full border-2 border-primary object-cover transition-opacity duration-500 absolute ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
          {/* Photo Upload */}
          <label className="label text-sm font-semibold mt-3">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", {
              validate: {
                fileType: (files) => {
                  if (!files || !files[0]) return true;
                  const allowed = ["image/jpeg", "image/png", "image/gif"];
                  return (
                    allowed.includes(files[0].type) ||
                    "Only JPG, PNG, GIF allowed"
                  );
                },
                fileSize: (files) => {
                  if (!files || !files[0]) return true;
                  return (
                    files[0].size <= 2 * 1024 * 1024 || "Max file size 2MB"
                  );
                },
              },
            })}
            className="file-input w-full rounded-full"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />

          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}

          {/* Name */}
          <label className="label text-sm font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full rounded-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email (read-only) */}
          <label className="label text-sm font-semibold mt-2">Email</label>
          <input
            type="email"
            readOnly
            {...register("email")}
            className="input input-bordered w-full rounded-full bg-base-300 cursor-not-allowed"
          />

          {/* Phone */}
          <label className="label text-sm font-semibold mt-2">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="input input-bordered w-full rounded-full"
          />

          {/* Role */}
          <label className="label text-sm font-semibold mt-2">Role</label>
          <select
            {...register("role", { required: true })}
            className="select select-bordered w-full rounded-full"
            disabled={user.isAdmin}
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>

          {/* Verified */}
          <label className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              {...register("verified")}
              className="checkbox text-primary"
            />
            <span className="font-semibold text-sm">Verified</span>
          </label>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-5">
            <button type="submit" className="btn btn-primary rounded-full">
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
