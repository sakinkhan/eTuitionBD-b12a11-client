import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

const Career = () => {
  const { theme } = useContext(ThemeContext);
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value),
      );

      const res = await axios.post(
        "http://localhost:5000/api/careers",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.status === 201) {
        setSubmitStatus("success");
        setFormData(initialState);
        setTimeout(() => setSubmitStatus(""), 4000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-full border text-sm outline-none transition " +
    "bg-base-100 text-base-content border-base-300 " +
    "focus:ring-2 focus:ring-primary focus:border-transparent " +
    "dark:bg-base-200 dark:text-base-content dark:border-base-300 dark:placeholder-base-content/50";

  const labelBase = "block text-sm font-medium mb-1.5 text-base-content";

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8
      bg-linear-to-b from-base-100 to-base-200"
    >
      <div
        className="mx-auto max-w-3xl rounded-xl shadow-lg
        bg-base-100 p-6 sm:p-8"
      >
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Join Our Team
          </h1>
          <p className="text-base-content/70">
            Smart people. Meaningful work. No nonsense.
          </p>
        </header>

        {/* Status */}
        {submitStatus === "success" && (
          <div
            className="mb-6 rounded-lg border p-4 text-sm
            bg-green-50 border-green-200 text-green-800
            dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
          >
            Application submitted successfully.
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="mb-6 rounded-lg border p-4 text-sm
            bg-red-50 border-red-200 text-red-800
            dark:bg-red-900/30 dark:border-red-700 dark:text-red-300"
          >
            Something went wrong. Please try again.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelBase}>Full Name *</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputBase}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className={labelBase}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputBase}
                placeholder="Your email address"
              />
            </div>

            <div>
              <label className={labelBase}>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                className={inputBase}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className={labelBase}>Position *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={inputBase}
              >
                <option value="">Select position</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="fullstack">Full Stack Developer</option>
                <option value="uiux">UI/UX Designer</option>
                <option value="devops">DevOps Engineer</option>
              </select>
            </div>

            <div>
              <label className={labelBase}>Experience *</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={inputBase}
              >
                <option value="">Select level</option>
                <option value="fresher">Fresher</option>
                <option value="junior">1–2 years</option>
                <option value="mid">3–5 years</option>
                <option value="senior">5+ years</option>
              </select>
            </div>

            <div>
              <label className={labelBase}>Resume *</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                required
                className={`${inputBase} file:text-sm file:border-0 file:bg-transparent file-input`}
              />
            </div>
          </div>

          <div>
            <label className={labelBase}>Cover Letter *</label>
            <textarea
              name="coverLetter"
              rows={5}
              value={formData.coverLetter}
              onChange={handleChange}
              required
              className={`${inputBase} rounded-xl`}
              placeholder="Write your cover letter here..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full py-3 text-sm font-semibold
                bg-primary text-white hover:bg-secondary hover:text-black
                disabled:opacity-60 transition cursor-pointer"
            >
              {loading ? "Submitting…" : "Submit Application"}
            </button>

            <button
              type="button"
              onClick={() => setFormData(initialState)}
              className="flex-1 rounded-full py-3 text-sm font-semibold
                bg-gray-300 text-black hover:bg-gray-400 hover:text-white transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Career;
