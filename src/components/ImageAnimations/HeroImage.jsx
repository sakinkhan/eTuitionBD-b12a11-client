import React from "react";
import heroImg from "../../assets/hero4.jpg";
import { RiRulerLine } from "react-icons/ri";
import { TbGeometry } from "react-icons/tb";
import { FaArrowTrendUp, FaPencil } from "react-icons/fa6";

const HeroImage = () => {
  return (
    <div className="relative w-full mx-auto max-w-3xl lg:max-w-2xl">
      {/* Hero Image */}
      <img
        src={heroImg}
        alt="heroImg"
        className="w-full rounded-3xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl animate-float"
      />

      {/* Decorative Icons - Mobile (small) / Tablet (medium) / Desktop (large) */}
      <RiRulerLine
        className="
          absolute top-6 -left-4
          sm:top-8 sm:-left-4
          md:top-10 md:-left-10
          text-blue-400
          w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12
          animate-spin-slow
        "
      />

      <FaArrowTrendUp
        className="
          absolute bottom-20 -left-7
          sm:bottom-36 sm:left-5
          md:bottom-40 md:-left-12
          text-green-500
          w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12
          animate-bounce-slow
        "
      />

      <TbGeometry
        className="
          absolute top-5 -right-4
          sm:top-32 sm:right-5
          md:top-36 md:-right-8
          text-purple-500
          w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12
          animate-bounce-slow delay-2000
        "
      />

      <FaPencil
        className="
          absolute bottom-4 -right-3
          sm:bottom-6 sm:right-5
          md:bottom-5 md:-right-10
          text-red-500
          w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12
          animate-pulse
        "
      />
    </div>
  );
};

export default HeroImage;
