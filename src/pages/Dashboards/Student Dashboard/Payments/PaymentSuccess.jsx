import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SuccessLottie from "../../../../components/Lotties/SuccessLottie";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState("pending"); // 'pending' | 'success' | 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axiosSecure.patch(
          `/verify-payment-success?session_id=${sessionId}`
        );

        if (!isMounted) return;

        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Payment verified successfully");
        } else {
          setStatus("error");
          setMessage(res.data.message || "Payment verification failed");
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Payment verification error:", err);
        setStatus("error");
        setMessage("Something went wrong while verifying the payment.");
      }
    };

    verifyPayment();

    return () => {
      isMounted = false; // prevent setting state after unmount
    };
  }, [sessionId, axiosSecure]);

  return (
    <div className="px-5 py-10 flex flex-col items-center justify-center">
      {status === "pending" && (
        <p className="text-xl text-gray-500">Verifying your payment...</p>
      )}

      {(status === "success" || status === "error") && (
        <>
          {status === "success" && <SuccessLottie />}
          <h2
            className={`text-4xl text-center font-bold ${
              status === "success" ? "text-primary" : "text-red-500"
            }`}
          >
            {status === "success"
              ? "You're all set. Payment Successful!"
              : "Payment Verification Failed"}
          </h2>
          <p className="text-center font-medium text-xl px-5 pt-5">{message}</p>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
