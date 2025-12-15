import React from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { FaCheckCircle } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import learningImg from "../../assets/hero1.jpg";

const WhyChooseUs = () => {
  return (
    <section className="relative px-5 lg:px-20 py-16 bg-linear-to-bl from-primary/20 via-secondary/20 to-primary/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="relative">
          {/* Main card image */}
          <div className="relative rounded-4xl overflow-hidden shadow-lg h-60 md:h-[280px] lg:h-[300px]">
            {/* hover 3D image */}
            <div className="hover-3d">
              {/* content */}
              <figure className="w-full h-full">
                <img
                  src={learningImg}
                  alt="3D card"
                  className="w-full h-full object-cover"
                />
              </figure>
              {/* 8 empty divs needed for the 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Top-right rating badge */}
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md backdrop-blur animate-bounce-slow delay-500">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-secondary)" }}
              >
                {/* Star icon */}
                <MdStars />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">
                  4.6 <span className="text-gray-500">(2.4k)</span>
                </p>
                <p className="text-xs text-gray-600">AVG Reviews</p>
              </div>
            </div>
          </div>

          {/* Bottom-left enrolled badge */}
          <div className="absolute -bottom-6 left-2 flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2 shadow-md backdrop-blur animate-bounce-slow">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Enrolled Tutors
              </p>
              <p className="text-sm font-semibold text-gray-900">36k+</p>
            </div>

            {/* Avatars TODO!! */}
            <div className="flex -space-x-2">
              {[
                "/images/av-1.jpg",
                "/images/av-2.jpg",
                "/images/av-3.jpg",
                "/images/av-4.jpg",
                "/images/av-5.jpg",
              ].map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Student ${idx + 1}`}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        {/* right Content */}
        <div>
          <p
            className="flex items-center gap-2 text-md font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-base-content">
            Our Commitment to <span className="text-primary">Excellence,</span>
            <br className="hidden sm:block" />
            Learn, Grow & Success.
          </h2>
          <p className="mt-4 text-base-content/80 max-w-xl">
            At <span className="text-primary font-medium">eTuitionBD</span>,
            we're committed to connecting students with the right tutors to make
            learning effective and accessible. Our platform empowers students to
            achieve their goals while providing tutors with meaningful teaching
            opportunities, creating a brighter future for everyone through
            education.
          </p>

          {/* Feature List */}
          <ul className="mt-6 space-y-4">
            {[
              "9/10 Average Satisfaction Rate",
              "96% Completion Rate",
              "Transparent Pricing - Clear, upfront fees with no hidden charges.",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="">
                  {/* Check Icon */}
                  <FaCheckCircle className="text-secondary" />
                </span>
                <span className="text-base-content">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <PrimaryButton to="/about" label="Read More"></PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
