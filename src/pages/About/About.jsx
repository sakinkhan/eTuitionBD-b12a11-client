import React from "react";
import { Link } from "react-router";
import { BsCheckCircleFill } from "react-icons/bs";
import Logo from "../../components/Logo/Logo";
import KeyFeatures from "../../components/KeyFeatures/KeyFeatures";
import aboutBG from "../../assets/about-us-bg.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <section className="relative bg-base-200 py-16">
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${aboutBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Content on top */}
        <div className="relative max-w-6xl mx-auto px-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center z-10 relative">
            About eTuitionBD
          </h1>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16">
        <div className="px-10 md:px-20">
          <h2 className="text-3xl font-bold  text-primary mb-6">Our Purpose</h2>
          <p className="text-lg text-base-content leading-relaxed">
            Finding the right tutor or tuition can often be confusing and
            time-consuming. eTuitionBD solves real problems by helping students
            find verified tutors, reducing friction through automated workflows,
            and providing structured communication and transparent payments. Our
            platform also supports admins in monitoring and regulating all
            activities efficiently.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
          Join eTuitionBD Today
        </h3>
        <p className="text-base-content mb-6">
          Whether you're a student seeking quality tuition or a tutor looking
          for opportunities, our platform makes it simple and secure.
        </p>
        <Link
          to="/register"
          className="btn bg-primary text-white hover:bg-secondary transition-colors duration-200 rounded-full px-8 py-3"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
