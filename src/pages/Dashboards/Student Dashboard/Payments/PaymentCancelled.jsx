import React from "react";
import { Link } from "react-router";
import FailedLottie from "../../../../components/Lotties/FailedLottie";

const PaymentCancelled = () => {
  return (
    <div className="px-5 flex flex-col items-center">
      <FailedLottie></FailedLottie>
      <h2 className="text-4xl text-center font-bold">
        Payment not <span className="text-primary">completed!</span>
      </h2>
      <p className="text-center font-medium text-xl px-5 py-5">
        No payment was made. You can try again when you're ready.
      </p>
      <Link to={"/dashboard/applied-tutors"}>
        <button className="btn btn-primary rounded-full hover:bg-secondary hover:text-gray-800">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
