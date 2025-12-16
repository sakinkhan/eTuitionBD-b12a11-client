import React from "react";
import successAnim from "../../animations/Success.json";
import Lottie from "lottie-react";

const SuccessLottie = () => {
  return (
    <div className="w-[450px] max-w-full mx-auto px-4 pt-10">
      <Lottie
        animationData={successAnim}
        loop={false}
        autoplay={true}
        className="w-full h-auto"
      />
    </div>
  );
};

export default SuccessLottie;
