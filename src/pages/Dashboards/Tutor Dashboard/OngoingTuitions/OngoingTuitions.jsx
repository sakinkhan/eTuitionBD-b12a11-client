import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import { AiTwotoneMail } from "react-icons/ai";
import { GrPhone } from "react-icons/gr";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tutor-ongoingTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/ongoing-tuitions`);
      return res.data;
    },
  });
  console.log("OngoingTuitions", tuitions);
  if (isLoading) {
    return <LoadingLottie></LoadingLottie>;
  }
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        My <span className="text-primary">Ongoing</span> Tuitions (
        {tuitions.length})
      </h2>
      {tuitions.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You don't have any ongoing tuitions yet
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition Details</th>
                <th>Student Name</th>
                <th>Student Contact</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition, i) => (
                <tr key={tuition._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="badge badge-sm badge-info rounded-full">
                        {tuition.applicationCode}
                      </span>
                      <span>{tuition.tuitionTitle}</span>
                    </div>
                  </td>
                  <td>{tuition.studentName}</td>
                  <td>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center gap-2">
                        <AiTwotoneMail className="text-primary" />
                        {tuition.studentEmail}
                      </div>
                      <div className="flex items-center gap-2">
                        <GrPhone className="text-primary" />
                        {tuition.studentPhone}
                      </div>
                    </div>
                  </td>
                  <td className="text-primary font-semibold">
                    ৳ {tuition.salary.toLocaleString("en-BD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tuitions.length === 0 && (
            <p className="text-center py-10 text-gray-500">No earnings yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
