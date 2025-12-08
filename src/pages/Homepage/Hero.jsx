import React from "react";
import heroImg from "../../assets/hero4.jpg";
import { PiPlugsConnectedBold } from "react-icons/pi";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import HeroImage from "../../components/ImageAnimations/HeroImage";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 justify-between px-20 py-10">
      <div className="left text-center md:text-left md:pr-20">
        <div className="flex items-center gap-2">
          <PiPlugsConnectedBold className="text-primary" />
          <h4 className="text-sm md:text-md font-semibold ">
            Connecting Students and Tutors, Seamlessly...
          </h4>
        </div>
        <h3 className="text-4xl md:text-6xl font-bold mt-2">
          Find, Learn, <span className="text-primary">Excel</span> - All in One
          <span className="text-secondary"> Place.</span>
        </h3>
        <p className="mt-8">
          Welcome to{" "}
          <span className="text-primary font-medium">eTuitionBD</span>. Connect
          with verified tutors, post your tuition needs, and learn
          smarter—faster, easier, and all in one place. Your next lesson is just
          a click away!
        </p>
        <div className="button mt-8">
          <PrimaryButton to="/register" label="Get Started" />
        </div>
      </div>
      <div className="right mx-10">
        <HeroImage></HeroImage>
      </div>
    </div>
  );
};

export default Hero;
