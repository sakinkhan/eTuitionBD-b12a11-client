import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import TuitionListCard from "./TuitionListCard";

const Tuitions = () => {
  const axiosPublic = useAxios();
  const [searchText, setSearchText] = useState("");

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tuitions", searchText],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tuition-posts?search=${searchText}`);
      return res.data;
    },
  });

  return (
    <div className="mx-auto px-5 md:px-20 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-base-content text-center">
        Available <span className="text-primary">Tuition</span> Listings
      </h1>
      <p className="text-base-content text-center mt-2 mb-5">
        Find tuition opportunities based on your subject, location, tuition code, class etc.
      </p>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <label className="flex items-center w-10/12 md:w-120 bg-accent/70 rounded-full px-3 py-2 shadow-sm">
          <svg
            className="h-4 w-4 text-primary mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search by subject, location, tuition code, class..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="grow bg-transparent outline-none text-base-content placeholder-base-content/60 text-sm"
          />
        </label>
      </div>

      {/* Tuition Cards / Loading */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingLottie />
          </div>
        ) : tuitions.length === 0 ? (
          <p className="text-center text-lg text-base-content/70 mt-20">
            No tuitions found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {tuitions.map((t) => (
              <TuitionListCard key={t._id || t.id} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuitions;
