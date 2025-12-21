import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import TutorCard from "../../Tutors/TutorCard";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import useAxios from "../../../hooks/useAxios";
import TutorProfileModal from "../../../components/TutorProfileModal/TutorProfileModal";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LatestTutors = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTutorId, setSelectedTutorId] = useState(null);

  const handleViewProfile = (tutorId) => {
    if (!user) {
      toast.info("Please log in to view tutor profiles");
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });

      return;
    }

    setSelectedTutorId(tutorId);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["latest-tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors/public", {
        params: {
          page: 1,
          limit: 10, // latest tutors only
        },
      });
      return res.data;
    },
  });

  const tutors = data?.tutors || [];

  if (isLoading) return <LoadingLottie />;

  if (tutors.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No tutors available at the moment
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-12 lg:px-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-2">
          Latest <span className="text-primary">Tutors</span>
        </h2>
        <p className="text-base-content/80">
          Explore the most recent tutors available on{" "}
          <span className="text-primary">eTuitionBD</span>
        </p>
        <div className="w-24 h-1 bg-secondary mx-auto mt-5 rounded-full"></div>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView={3}
        preventClicks={false}
        preventClicksPropagation={false}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        style={{
          "--swiper-pagination-color": "#ff7100",
          "--swiper-navigation-color": "#ff7100",
        }}
        className="mySwiper pb-15! overflow-visible"
      >
        {tutors.map((tutor) => (
          <SwiperSlide key={tutor._id}>
            <TutorCard
              key={tutor._id}
              tutor={tutor}
              onViewProfile={() => handleViewProfile(tutor.tutorId)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <TutorProfileModal
        tutorId={selectedTutorId}
        isOpen={!!selectedTutorId}
        onClose={() => setSelectedTutorId(null)}
      />
    </div>
  );
};

export default LatestTutors;
