import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";

const Payment = () => {
  const { tuitionPostId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: tuitionPost, isLoading } = useQuery({
    queryKey: ["tuition-post", tuitionPostId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-posts/${tuitionPostId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingLottie />;
  }

  console.log(tuitionPost);

  return (
    <div>
      <p className="text-2xl">Please Pay here </p>
      <button className="btn btn-primary">PAY</button>
    </div>
  );
};

export default Payment;
