import React from "react";
import animation from "../../animations/loading.json";
import Lottie from "lottie-react";

const LoadingLottie = () => {
  return (
    <div className="w-[450px] max-w-full mx-auto px-4 py-15">
      <Lottie
        animationData={animation}
        loop
        autoplay
        className="w-full h-auto"
      />
    </div>
  );
};

export default LoadingLottie;
