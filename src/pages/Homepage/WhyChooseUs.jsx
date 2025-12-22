import React from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { FaCheckCircle } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import learningImg from "../../assets/hero1.jpg";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";

const WhyChooseUs = () => {
  const axiosPublic = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["latest-tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors/public", {
        params: {
          page: 1,
          limit: 10,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <LoadingLottie />;

  const tutors = data?.tutors || [];

  return (
    <section className="relative px-5 lg:px-20 py-16 bg-linear-to-bl from-primary/20 via-secondary/20 to-primary/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="relative">
          {/* Image Card */}
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-video rounded-4xl overflow-hidden shadow-lg">
            {/* Hover 3D Wrapper */}
            <div className="hover-3d absolute inset-0">
              {/* Image */}
              <figure className="absolute inset-0">
                <img
                  src={learningImg}
                  alt="Learning experience"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>

              {/* Required empty divs for 3D effect */}
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>

            {/* Top-right rating badge */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md backdrop-blur animate-bounce-slow">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-secondary)" }}
              >
                <MdStars className="text-white" />
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
          <div className="absolute bottom-3 left-3 sm:-bottom-6 sm:left-2 z-10 flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2 shadow-md backdrop-blur animate-bounce-slow">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Enrolled Tutors
              </p>
              <p className="text-sm font-semibold text-primary">36k+</p>
            </div>

            {/* Avatars */}
            <div className="flex -space-x-2">
              {isLoading
                ? [...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-8 rounded-full bg-gray-200 border-2 border-primary animate-pulse"
                    />
                  ))
                : tutors
                    .filter((tutor) => tutor.photoURL)
                    .slice(0, 5)
                    .map((tutor, idx) => (
                      <img
                        key={tutor._id || idx}
                        src={tutor.photoURL}
                        alt={tutor.name || `Tutor ${idx + 1}`}
                        className="h-8 w-8 rounded-full border-2 border-primary object-cover"
                      />
                    ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
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
            we’re committed to connecting students with the right tutors to make
            learning effective and accessible. Our platform empowers students to
            achieve their goals while giving tutors meaningful teaching
            opportunities.
          </p>

          {/* Feature List */}
          <ul className="mt-6 space-y-4">
            {[
              "9/10 Average Satisfaction Rate",
              "96% Completion Rate",
              "Transparent Pricing with no hidden charges",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <FaCheckCircle className="text-secondary shrink-0" />
                <span className="text-base-content">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <PrimaryButton to="/about" label="Read More" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
