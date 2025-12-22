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

  // 🔹 Sort state
  const [sort, setSort] = useState({
    sortBy: "createdAt",
    sortOrder: "desc", // newest first by default
  });

  const { data: tuitionsData = {}, isLoading } = useQuery({
    queryKey: ["tuitions", searchText, sort, page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get("/tuition-posts", {
        params: {
          search: searchText,
          sortBy: sort.sortBy,
          sortOrder: sort.sortOrder,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tuitions = tuitionsData?.posts || [];
  const totalItems = tuitionsData?.total || 0;

  const approvedTuitions = tuitions.filter(
    (t) => t.status === "admin-approved"
  );

  const handleSortChange = (value) => {
    switch (value) {
      case "date-asc":
        setSort({ sortBy: "createdAt", sortOrder: "asc" });
        break;
      case "budget-asc":
        setSort({ sortBy: "budget", sortOrder: "asc" });
        break;
      case "budget-desc":
        setSort({ sortBy: "budget", sortOrder: "desc" });
        break;
      default:
        setSort({ sortBy: "createdAt", sortOrder: "desc" });
    }
    setPage(1);
  };

  return (
    <div className="mx-auto px-5 md:px-20 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-base-content text-center">
        Available <span className="text-primary">Tuition</span> Listings (
        {approvedTuitions.length})
      </h1>
      <p className="text-base-content text-center mt-2 mb-6">
        Browse and sort tuition opportunities easily.
      </p>

      {/* Search + Sort + Page Size */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Search by class, subject, location..."
        />
        {/* Sort */}
        <select
          className="select select-bordered rounded-full w-50 text-primary"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="budget-asc">Budget: Low → High</option>
          <option value="budget-desc">Budget: High → Low</option>
        </select>

        <PageSizeSelect
          value={limit}
          options={[4, 8, 16, 40]}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

      {/* Tuition Cards */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingLottie />
          </div>
        ) : approvedTuitions.length === 0 ? (
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
