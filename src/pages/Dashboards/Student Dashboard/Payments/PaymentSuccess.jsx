import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SuccessLottie from "../../../../components/Lotties/SuccessLottie";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/verify-payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (!res.data.success) {
            console.error("Payment verification failed");
          }
        })
        .catch((err) => {
          console.error("Verification error", err);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="px-5">
      <SuccessLottie></SuccessLottie>
      <h2 className="text-4xl text-center font-bold">
        You're all set. Payment{" "}
        <span className="text-primary">Successful!</span>
      </h2>
      <p className="text-center font-medium text-xl px-5 pt-5">
        You can view your payment details anytime in your dashboard payment
        history.
      </p>
    </div>
  );
};

export default PaymentSuccess;
