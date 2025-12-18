import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import { AiTwotoneMail } from "react-icons/ai";
import { GrPhone } from "react-icons/gr";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  // Local state
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Fetch data with react-query
  const { data, isLoading } = useQuery({
    queryKey: ["tutor-ongoingTuitions", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/ongoing-tuitions`, {
        params: { search: searchText, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tuitions = data?.ongoingTuitions || [];
  const totalItems = data?.total || 0;
  const currentPage = page;
  const pageSize = limit;
  
  console.log("ongoing tuitions", tuitions);

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Ongoing</span> Tuitions ({totalItems})
      </h2>

      {/* Search Bar & Page Size selection */}
      <div className="mb-10 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Start typing to search..."
          className="mr-2"
        />
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // reset to first page on limit change
          }}
          className="ml-2 p-1 h-9 text-primary rounded-2xl focus:ring-1 focus:ring-primary focus:outline-none border border-gray-300 "
        >
          <option className="bg-accent" value={5}>
            5
          </option>
          <option className="bg-accent" value={10}>
            10
          </option>
          <option className="bg-accent" value={20}>
            20
          </option>
          <option className="bg-accent" value={50}>
            50
          </option>
        </select>
      </div>

      {totalItems === 0 ? (
        <p className="text-center text-gray-500 mt-10 py-10">
          You don't have any ongoing tuitions yet
        </p>
      ) : (
        <div className="overflow-x-auto">
          {isLoading && <LoadingLottie />}

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Details</th>
                <th>Student Name</th>
                <th>Student Contact</th>
                <th>Net Earning</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, i) => (
                <tr key={tuition._id}>
                  <td>{i + 1 + (currentPage - 1) * pageSize}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="badge badge-sm badge-info rounded-full">
                        {tuition.applicationCode}
                      </span>
                      <span>{tuition.tuitionTitle}</span>
                    </div>
                  </td>
                  <td>{tuition.studentName}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center gap-2">
                        <AiTwotoneMail className="text-primary" />
                        {tuition.studentEmail}
                      </div>
                      <div className="flex items-center gap-2">
                        <GrPhone className="text-primary" />
                        {tuition.studentPhone}
                      </div>
                    </div>
                  </td>
                  <td className="text-primary font-semibold">
                    ৳ {tuition.tutorEarning?.toLocaleString("en-BD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tuitions.length === 0 && (
            <p className="text-center py-10 text-gray-500">No earnings yet</p>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default OngoingTuitions;
