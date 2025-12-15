import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  console.log("Payment History page: payments", payments);

  if (isLoading) {
    return <LoadingLottie></LoadingLottie>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        <span className="text-primary">Payment</span> History ({payments.length}
        )
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-500 text-center py-5">
          No payment records found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Details</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <p className="text-sm badge badge-sm badge-info rounded-full">
                        {payment.tuitionCode}
                      </p>
                      <p className="font-medium mt-2">{payment.tuitionTitle}</p>
                    </div>
                  </td>
                  <td>৳{payment.amount}</td>
                  <td className="text-sm break-all">
                    {payment.displayTransactionId}
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
    </div>
  );
};

export default PaymentHistory;
