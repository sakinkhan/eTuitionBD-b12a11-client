import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaChalkboardUser,
  FaBookmark,
  FaHandshake,
  FaMapLocationDot,
} from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAxios from "../../../hooks/useAxios";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";

const statsIcons = [
  { icon: <FaChalkboardUser size={50} />, key: "tutors" },
  { icon: <FaBookmark size={50} />, key: "tuitions" },
  { icon: <FaHandshake size={50} />, key: "matches" },
  { icon: <FaMapLocationDot size={50} />, key: "cities" },
];

const PlatformStatistics = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const navigate = useNavigate();
  const location = useLocation();
  const { user: firebaseUser } = useAuth();
  const { role } = useCurrentUser() || {};
  const axiosInstance = useAxios();

  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosInstance.get("/statistics");
        const data = response.data;

        // Map backend data to statsData format
        const formattedStats = [
          {
            icon: statsIcons[0].icon,
            value: data.totalTutors || 0,
            suffix: "+",
            label: "Total Tutors",
            description: "Expert educators ready to help",
          },
          {
            icon: statsIcons[1].icon,
            value: data.activeTuitions || 0,
            suffix: "+",
            label: "Active Tuitions",
            description: "Diverse learning opportunities",
          },
          {
            icon: statsIcons[2].icon,
            value: data.successfulMatches || 0,
            suffix: "+",
            label: "Successful Matches",
            description: "Happy students & tutors",
          },
          {
            icon: statsIcons[3].icon,
            value: data.citiesCovered || 0,
            suffix: "+",
            label: "Cities Covered",
            description: "Nationwide reach & accessibility",
          },
        ];

        setStatsData(formattedStats);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Fallback to default values if API fails
        setStatsData([
          {
            icon: statsIcons[0].icon,
            value: 2500,
            suffix: "+",
            label: "Total Tutors",
            description: "Expert educators ready to help",
          },
          {
            icon: statsIcons[1].icon,
            value: 8400,
            suffix: "+",
            label: "Active Tuitions",
            description: "Diverse learning opportunities",
          },
          {
            icon: statsIcons[2].icon,
            value: 15000,
            suffix: "+",
            label: "Successful Matches",
            description: "Happy students & tutors",
          },
          {
            icon: statsIcons[3].icon,
            value: 64,
            suffix: "+",
            label: "Cities Covered",
            description: "Nationwide reach & accessibility",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [axiosInstance]);

  if (loading) {
    return <LoadingLottie />;
  }

  const handlePostTuition = () => {
    // If not logged in, redirect to login
    if (!firebaseUser) {
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }

    // If logged in as student, allow to post tuition
    if (role === "student") {
      navigate("/dashboard/post-tuitions");
      return;
    }

    // If logged in as tutor or admin, show error
    if (role === "tutor" || role === "admin") {
      toast.error("Oops, you have to login as a Student to post a tuition");
      return;
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10
      bg-linear-to-tl from-primary/20 via-secondary/20 to-primary/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Platform <span className="text-primary">Statistics</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            Build trust fast with our growing community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 sm:p-8
              rounded-xl bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300
              border border-base-300"
            >
              {/* Icon */}
              <div className="text-primary mb-4">{stat.icon}</div>

              {/* Counter */}
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    useEasing={true}
                    separator=","
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>

              {/* Label */}
              <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-base-content/60">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base-content/70 mb-4">
            Find verified tutors or post a tuition in minutes — simple, secure,
            and transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tutors"
              className="px-8 py-3 rounded-full font-semibold
              bg-primary text-white hover:bg-secondary hover:text-black cursor-pointer transition"
            >
              Find a Tutor
            </Link>
            <button
              onClick={handlePostTuition}
              className="px-8 py-3 rounded-full font-semibold
              bg-secondary text-black hover:bg-primary hover:text-white cursor-pointer transition"
            >
              Post a Tuition
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformStatistics;
