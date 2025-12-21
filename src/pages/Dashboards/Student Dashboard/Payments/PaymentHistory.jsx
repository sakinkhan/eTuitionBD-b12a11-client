import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import PageSizeSelect from "../../../../components/PageSizeSelect/PageSizeSelect";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data = { payments: [], total: 0, page: 1, limit: 20 }, isLoading } =
    useQuery({
      queryKey: ["payment-history", searchText, page, limit],
      queryFn: async () => {
        const res = await axiosSecure.get("/payments", {
          params: {
            search: searchText,
            page,
            limit,
          },
        });
        return res.data;
      },
    });

  const payments = data.payments || [];
  const totalApps = data.total || 0;
  const currentPage = data.page || 1;
  const pageSize = data.limit || 20;

  const totalSpent = payments.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        <span className="text-primary">Payment</span> History ({totalApps})
      </h2>
      <div className="mb-6 text-lg font-semibold text-center">
        Total Spent:{" "}
        <span className="text-primary">
          ৳ {totalSpent.toLocaleString("en-BD")}
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

      {totalApps === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No payment records found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          {isLoading && <LoadingLottie />}
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Details</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr key={payment._id}>
                  <td>{i + 1 + (currentPage - 1) * pageSize}</td>
                  <td>
                    <div>
                      <p className="text-sm badge badge-sm badge-info rounded-full">
                        {payment.tuitionCode}
                      </p>
                      <p className="font-medium mt-2">{payment.tuitionTitle}</p>
                    </div>
                  </td>
                  <td className="text-sm break-all">
                    {payment.displayTransactionId}
                  </td>
                  <td className="text-primary font-semibold">
                    ৳ {payment.amount.toLocaleString("en-BD")}
                  </td>
                  <td>
                    <span className="badge badge-success rounded-full">
                      {payment.paymentStatus.charAt(0).toUpperCase() +
                        payment.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination controls */}
      <Pagination
        currentPage={page}
        totalItems={totalApps}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default PaymentHistory;
