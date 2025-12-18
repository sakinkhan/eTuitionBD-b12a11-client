import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import LatestTuitionCard from "./LatestTuitionCard";

const LatestTuitions = () => {
  const axiosInstance = useAxios();

  const {
    data: tuitionPostsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuitionPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tuition-posts");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  const tuitionPosts = tuitionPostsData?.posts || [];
  console.log(tuitionPosts);

  if (isLoading) return <LoadingLottie />;

  if (isError)
    return (
      <p className="text-center py-20 text-red-500 font-medium h-100">
        Failed to load tuition posts. Please try again later.
      </p>
    );

  if (!tuitionPosts.length)
    return (
      <p className="text-center py-40 text-gray-500 font-medium">
        No tuition posts available at the moment.
      </p>
    );

  return (
    <section className="py-16 px-4 md:px-12 lg:px-20 bg-base-200">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-2">
          Latest <span className="text-primary">Tuitions</span>
        </h2>
        <p className="text-base-content/80">
          Explore the most recent tuition opportunities
        </p>
        <div className="w-24 h-1 bg-secondary mx-auto mt-5 rounded-full"></div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        navigation={true}
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{
          "--swiper-pagination-color": "#ff7100",
          "--swiper-navigation-color": "#ff7100",
        }}
        className="mySwiper pb-15!"
      >
        {tuitionPosts.map((post) => (
          <SwiperSlide key={post._id}>
            <LatestTuitionCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestTuitions;
