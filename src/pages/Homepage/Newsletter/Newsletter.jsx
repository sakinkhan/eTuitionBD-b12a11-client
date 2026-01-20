import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/newsletter/subscribe", {
        email,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("You're already subscribed to our newsletter");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-4xl mx-auto">
        {/* Background decoration */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-10"></div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/20">
                <HiOutlineMail size={40} className="text-primary" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
              Stay Updated
            </h2>

            {/* Subheading */}
            <p className="text-base-content/70 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest tuition opportunities, learning tips, and success
              stories delivered to your inbox
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full border border-base-300
                bg-base-100 text-base-content placeholder-base-content/50
                focus:ring-2 focus:ring-primary focus:border-transparent
                outline-none transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-full font-semibold
                bg-primary text-white hover:bg-secondary hover:text-black cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed
                transition duration-200 whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {/* Privacy note */}
            <p className="text-xs text-base-content/50 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Stats below newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">50K+</p>
            <p className="text-sm text-base-content/70 mt-1">Subscribers</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              Weekly
            </p>
            <p className="text-sm text-base-content/70 mt-1">Updates</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-base-content/70 mt-1">Free</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">0%</p>
            <p className="text-sm text-base-content/70 mt-1">Spam</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
