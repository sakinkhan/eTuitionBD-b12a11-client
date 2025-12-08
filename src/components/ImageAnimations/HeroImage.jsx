import React from "react";
import heroImg from "../../assets/hero4.jpg";
import { RiRulerLine } from "react-icons/ri";
import { TbGeometry } from "react-icons/tb";
import { FaArrowTrendUp, FaPencil } from "react-icons/fa6";

const HeroImage = () => {
  return (
    <div className="relative w-full mx-auto max-w-6xl">
      {/* Hero Image */}
      <img
        src={heroImg}
        alt="heroImg"
        className="w-full rounded-3xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl animate-float"
      />

      {/* Decorative floating icons */}
      <RiRulerLine className="absolute top-10 -left-10 md:-left-10 sm:left-2 text-blue-400 w-12 h-12 md:w-15 md:h-15 animate-spin-slow" />
      <FaArrowTrendUp className="absolute bottom-40 -left-12 md:-left-12 sm:left-4 text-green-500 w-12 h-12 md:w-15 md:h-15 animate-bounce-slow" />
      <FaPencil className="absolute bottom-5 -right-10 md:-right-10 sm:right-4 w-12 h-12 md:w-14 md:h-14 text-red-500 animate-pulse" />
      <TbGeometry className="absolute top-36 -right-8 md:-right-8 sm:right-3 w-12 h-12 md:w-15 md:h-15 text-purple-500 animate-bounce-slow delay-2000"></TbGeometry>
    </div>
  );
};

export default HeroImage;
