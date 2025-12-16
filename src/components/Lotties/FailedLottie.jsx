import React from "react";
import failedAnim from "../../animations/Payment-Failed.json";
import Lottie from "lottie-react";

const FailedLottie = () => {
  return (
    <div className="w-[350px] max-w-full mx-auto px-4 pt-10 pb-5">
      <Lottie
        animationData={failedAnim}
        loop={false}
        autoplay={true}
        className="w-full h-auto"
      />
    </div>
  );
};

export default FailedLottie;
