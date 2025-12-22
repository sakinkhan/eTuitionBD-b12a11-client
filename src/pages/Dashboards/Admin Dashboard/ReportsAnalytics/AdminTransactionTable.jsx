import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import Pagination from "../../../../components/Pagination/Pagination";
import { TiArrowUnsorted } from "react-icons/ti";

const AdminTransactionTable = ({ dateRange }) => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("paidAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-transactions", page, sortBy, sortOrder, dateRange],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/transactions", {
        params: {
          page,
          limit: 7,
          sortBy,
          sortOrder,
          range: dateRange,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <LoadingLottie />;

  const transactions = data?.transactions || [];
  const total = data?.total || 0;
  const pageSize = data?.limit || 7;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-base-100 border border-primary rounded-2xl p-5 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        <span className="text-primary">Transaction</span> History ({total})
      </h3>

      <div className="w-full h-[300px] overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Tuition</th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("paidAt")}
              >
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span>Date</span>
                  <TiArrowUnsorted />
                </div>
              </th>
              <th>Transaction</th>
              <th
                className="cursor-pointer text-right"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span>Amount</span>
                  <TiArrowUnsorted />
                </div>
              </th>
              <th
                className="cursor-pointer text-right"
                onClick={() => handleSort("platformFee")}
              >
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span>Platform Fee</span>
                  <TiArrowUnsorted />
                </div>
              </th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>
                  <span className="badge badge-info badge-sm rounded-full">
                    {tx.tuitionCode}
                  </span>{" "}
                </td>
                <td>{new Date(tx.paidAt).toLocaleDateString()}</td>
                <td className="font-mono text-xs">{tx.displayTransactionId}</td>
                <td className="text-primary">৳{tx.amount}</td>
                <td className="text-primary">৳{tx.platformFee}</td>
                <td>
                  <span className="badge badge-success badge-sm rounded-full">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalItems={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AdminTransactionTable;
