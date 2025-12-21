import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import PageSizeSelect from "../../../../components/PageSizeSelect/PageSizeSelect";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data = { revenueRecords: [], total: 0, page: 1, limit: 20 },
    isLoading,
  } = useQuery({
    queryKey: ["tutor-revenue", searchText, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/revenue`, {
        params: {
          search: searchText,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const revenues = data.revenueRecords || [];
  const totalItems = data.total || 0;
  const currentPage = page;
  const pageSize = data.limit || 20;

  console.log("RevenueHistory", revenues);
  const totalEarnings = revenues.reduce(
    (sum, item) => sum + item.tutorEarning,
    0
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center pt-5 pb-3">
        My <span className="text-primary">Revenue</span> History ({totalItems})
      </h2>
      <div className="mb-6 text-lg font-semibold text-center">
        Total Earnings:{" "}
        <span className="text-primary">
          ৳ {totalEarnings.toLocaleString("en-BD")}
        </span>
      </div>
      {/* Search Bar & Page Size selection */}
      <div className="mb-10 flex items-center justify-center">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Start typing to search..."
          className="mr-2"
        />
        {/* Page Size selection drop down */}
        <PageSizeSelect
          value={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>
      {totalItems === 0 ? (
        <p className="text-center text-gray-500 mt-10 py-10">
          You don't have any revenue history yet
        </p>
      ) : (
        <div className="overflow-x-auto">
          {isLoading && <LoadingLottie />}
          <p className="text-sm text-gray-500 mb-2">
            Tutor Net Earning = Amount paid by student minus 10% eTuitionBD fee
          </p>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Details</th>
                <th>Amount Paid</th>
                <th>Net Earning</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((rev, i) => (
                <tr key={rev._id}>
                  <td>{i + 1 + (currentPage - 1) * pageSize}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="badge badge-sm badge-info rounded-full">
                        {rev.tuitionCode}
                      </span>
                      <span>{rev.tuitionTitle}</span>
                    </div>
                  </td>
                  <td className="text-yellow-600 font-semibold">
                    ৳ {rev.amount.toLocaleString("en-BD")}
                  </td>
                  <td className="text-primary font-semibold">
                    ৳ {rev.tutorEarning.toLocaleString("en-BD")}
                  </td>
                  <td>{rev.displayTransactionId}</td>
                  <td>{new Date(rev.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {revenues.length === 0 && (
            <p className="text-center py-10 text-gray-500">No earnings yet</p>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <Pagination
        currentPage={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default RevenueHistory;
