import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenues = [], isLoading } = useQuery({
    queryKey: ["tutor-revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/revenue`);
      return res.data;
    },
  });

  console.log("RevenueHistory", revenues);
  if (isLoading) {
    return <LoadingLottie></LoadingLottie>;
  }
  const totalEarnings = revenues.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center pt-5 pb-3">
        My <span className="text-primary">Revenue</span> History (
        {revenues.length})
      </h2>
      <div className="mb-6 text-lg font-semibold text-center">
        Total Earnings:{" "}
        <span className="text-primary">
          ৳ {totalEarnings.toLocaleString("en-BD")}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tuition Details</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map((rev, i) => (
              <tr key={rev._id}>
                <td>{i + 1}</td>
                <td>{rev.tuitionTitle}</td>
                <td className="text-primary font-semibold">
                  ৳ {rev.amount.toLocaleString("en-BD")}
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
    </div>
  );
};

export default RevenueHistory;
