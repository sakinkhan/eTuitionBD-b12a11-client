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
      const res = await axiosPublic.get(`tuition-posts?search=${searchText}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingLottie />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-base-content text-center">
        Available <span className="text-primary">Tuition</span> Listings
      </h1>
      <p className="text-base-content text-center mt-2 mb-8">
        Find tuition opportunities based on your subject, location, and class.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by subject, location, class..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-xl rounded-full px-5"
        />
      </div>

      {/* Tuition Cards */}
      {tuitions.length === 0 ? (
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
  );
};

export default Tuitions;
