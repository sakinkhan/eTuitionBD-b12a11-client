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

const LatestTutors = () => {
  const axiosPublic = useAxios();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data: tutorData, isLoading } = useQuery({
    queryKey: ["tutors", page, limit, searchText],
    queryFn: async () => {
      const res = await axiosPublic.get("/public-users", {
        params: {
          searchText,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tutors =
    tutorData?.users?.filter((user) => user.role === "tutor") || [];

  if (isLoading) return <LoadingLottie />;

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
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          scale: 1,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        style={{
          "--swiper-pagination-color": "#ff7100",
          "--swiper-navigation-color": "#ff7100",
        }}
        className="mySwiper pb-15!"
      >
        {tutors.map((tutor) => (
          <SwiperSlide key={tutor._id}>
            <TutorCard tutor={tutor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestTutors;
