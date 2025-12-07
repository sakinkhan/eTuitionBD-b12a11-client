import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import ErrorLottie from "../../../components/Lotties/ErrorLottie";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center py-16 px-6 md:px-20 min-h-screen
                 bg-neutral text-base-content transition-colors duration-300"
    >
      <title>Error-404</title>

      {/* Card Container */}
      <div className="bg-white/90 dark:bg-base-300/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center max-w-2xl w-full text-center transition-colors duration-300">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
          Oops... page not found
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-base-content/80 dark:text-base-content/70 mb-6">
          The page you're looking for isn't available. Use the Go Back button below.
        </p>

        {/* Lottie */}
        <div className="w-full max-w-sm my-6">
          <ErrorLottie />
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn px-8 py-4 rounded-full font-semibold text-lg
                     bg-primary text-white hover:bg-secondary hover:text-gray-900
                     dark:bg-primary dark:text-white dark:hover:bg-secondary dark:hover:text-gray-900
                     transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95 flex items-center gap-2 mt-4"
        >
          <IoChevronBack />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
