import React from "react";
import { Link } from "react-router";
import AboutLottie from "../../components/Lotties/AboutLottie";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content pb-24 pt-10 transition-colors duration-300">
      {/* Header Section */}
      <section className="mx-6 md:mx-20 rounded-3xl shadow-xl bg-base-100 backdrop-blur-xl border border-base-300 py-10 px-8 transition-colors duration-300">
        <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight text-center">
          About Us
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-center text-base-content/80 leading-relaxed">
          A simpler, more trustworthy way for students and tutors to find each
          other — without the noise, confusion, or guesswork.
        </p>
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-20 mt-20">
        {/* Lottie */}
        <div className="flex-1 max-w-md">
          <AboutLottie />
        </div>

        {/* Editorial Text */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-base-100 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-base-300 transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              What eTuitionBD Really Does
            </h2>

            <p className="text-lg text-base-content/80 leading-relaxed mb-6">
              We make it simple for students to find trustworthy tutors — and
              for tutors to reach the right students. No noise, no confusion,
              just a clean and reliable way to connect.
            </p>

            <p className="text-lg text-base-content/80 leading-relaxed">
              Profiles are verified, communication stays organised, and payments
              are secure. You focus on learning or teaching — we take care of
              the rest.
            </p>
          </div>
        </div>
      </div>

      {/* Join eTuitionBD Section */}
      <section className="mx-6 md:mx-20 mt-24 py-20 bg-accent/80 backdrop-blur-xl rounded-3xl shadow-xl border border-base-300 text-center transition-colors duration-300">
        <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
          Join eTuitionBD Today
        </h3>
        <p className="max-w-xl mx-auto text-lg text-base-content/80 mb-10">
          Whether you're here to learn or teach, this is your space.
        </p>

        <Link
          to="/register"
          className="px-10 py-4 rounded-full text-white font-semibold text-lg bg-primary hover:bg-secondary hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
