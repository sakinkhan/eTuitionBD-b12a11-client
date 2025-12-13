import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-3xl">Payment Cancelled</h2>
      <Link to={"/dashboard/applied-tutors"}>
        <button className="btn btn-primary rounded-full hover:bg-secondary hover:text-gray-800">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
