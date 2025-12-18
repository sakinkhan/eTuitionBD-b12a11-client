import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import Pagination from "../../components/Pagination/Pagination";
import TutorCard from "./TutorCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAxios from "../../hooks/useAxios";

const Tutors = () => {
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

  const totalItems = tutorData?.total || 0;
  return (
    <div className="px-5 lg:px-20 py-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-base-content text-center">
        Available <span className="text-primary">Tutors</span>
      </h1>
      <p className="text-base-content text-center mt-2 mb-5">
        Browse tutors available on the platform
      </p>

      {/* Search */}
      <div className="mb-5 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={(value) => {
            setSearchText(value);
            setPage(1);
          }}
          placeholder="Start typing to search..."
        />
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="ml-2 p-1 h-9 text-primary rounded-2xl focus:ring-1 focus:ring-primary focus:outline-none border border-gray-300"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n} className="bg-accent">
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="mt-10 px-15 md:px-0">
        {isLoading ? (
          <LoadingLottie />
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No tutors found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > limit && (
        <div className="mt-14 flex justify-center">
          <Pagination
            currentPage={page}
            totalItems={totalItems}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Tutors;
