import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../components/Lotties/LoadingLottie";
import Pagination from "../../components/Pagination/Pagination";
import TutorCard from "./TutorCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAxios from "../../hooks/useAxios";
import TutorProfileModal from "../../components/TutorProfileModal/TutorProfileModal";
import PageSizeSelect from "../../components/PageSizeSelect/PageSizeSelect";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Tutors = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
    queryKey: ["public-tutors", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors/public", {
        params: {
          search: searchText,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tutors = data?.tutors || [];
  const totalItems = data?.total || 0;

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
      <div className="mb-5 flex items-center justify-center gap-2">
        <SearchBar
          value={searchText}
          onChange={(value) => {
            setSearchText(value);
            setPage(1);
          }}
          placeholder="Start typing to search..."
        />
        <PageSizeSelect
          value={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

      {/* Cards */}
      <div className="mt-10">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <LoadingLottie />
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No tutors found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.tutorId}
                tutor={tutor}
                onViewProfile={() => handleViewProfile(tutor.tutorId)}
              />
            ))}
          </div>
        )}
      </div>

      <TutorProfileModal
        tutorId={selectedTutorId}
        isOpen={!!selectedTutorId}
        onClose={() => setSelectedTutorId(null)}
      />

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
