import React from "react";
import { Link } from "react-router";
import {
  FaBook,
  FaGraduationCap,
  FaLanguage,
  FaBullseye,
} from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";

const defaultCategories = [
  {
    id: 1,
    name: "Class 1–5",
    description: "Primary education foundation",
    icon: <FaBook size={40} />,
    color: "from-blue-500 to-blue-600",
    count: 45,
  },
  {
    id: 2,
    name: "SSC / HSC",
    description: "Secondary & Higher Secondary",
    icon: <FaGraduationCap size={40} />,
    color: "from-purple-500 to-purple-600",
    count: 55,
  },
  {
    id: 3,
    name: "English Medium",
    description: "International curriculum",
    icon: <FaLanguage size={40} />,
    color: "from-green-500 to-green-600",
    count: 67,
  },
  {
    id: 4,
    name: "Admission Test",
    description: "Entrance exam preparation",
    icon: <FaBullseye size={40} />,
    color: "from-orange-500 to-orange-600",
    count: 36,
  },
  {
    id: 5,
    name: "University / Skills",
    description: "Higher education & courses",
    icon: <FaUniversity size={40} />,
    color: "from-pink-500 to-pink-600",
    count: 71,
  },
];

const TuitionCategories = () => {
  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8
      bg-linear-to-bl from-base-200 to-base-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Tuition <span className="text-primary">Categories</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            Find tutors for any subject or level of education
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {defaultCategories.map((category) => (
            <Link
              key={category.id}
              to={`/tuitions?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl p-6
              bg-linear-to-br from-base-100 to-base-200 border border-base-300
              hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer"
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.color}
                opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/70 mb-4">
                  {category.description}
                </p>

                {/* Count */}
                <div
                  className="flex items-center gap-1 text-sm font-semibold
                  text-primary bg-primary/10 px-3 py-1 rounded-full"
                >
                  {category.count || 0}+ Tuitions
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All */}
        <div className="text-center mt-12">
          <Link
            to="/tuitions"
            className="inline-block px-8 py-3 rounded-full font-semibold
            bg-primary text-white hover:bg-secondary hover:text-black cursor-pointer transition"
          >
            Browse All Tuitions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TuitionCategories;
