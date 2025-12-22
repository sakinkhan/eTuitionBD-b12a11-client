import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import TuitionListCard from "./TuitionListCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import PageSizeSelect from "../../components/PageSizeSelect/PageSizeSelect";
import Pagination from "../../components/Pagination/Pagination";

const Tuitions = () => {
  const axiosPublic = useAxios();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data: tuitionsData = [], isLoading } = useQuery({
    queryKey: ["tuitions", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tuition-posts`, {
        params: {
          search: searchText,
          page,
          limit,
        },
      });
      return res.data;
    },
  });
  const tuitions = tuitionsData?.posts || [];
  const totalItems = tuitionsData?.total || 0;

  const approvedTuitions = tuitions.filter(
    (t) => t.status === "admin-approved"
  );

  return (
    <div className="mx-auto px-5 md:px-20 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-base-content text-center">
        Available <span className="text-primary">Tuition</span> Listings (
        {approvedTuitions.length})
      </h1>
      <p className="text-base-content text-center mt-2 mb-5">
        Find tuition opportunities based on your subject, location, tuition
        code, class etc.
      </p>

      {/* Search Bar & PageSizeSelect */}
      <div className="mb-10 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Start typing to search..."
          className="mr-2"
        />
        <PageSizeSelect
          value={limit}
          options={[4, 8, 16, 40]}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
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
            {approvedTuitions.map((t) => (
              <TuitionListCard key={t._id || t.id} t={t} />
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
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Tuitions;
