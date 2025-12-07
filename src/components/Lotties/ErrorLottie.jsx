import Lottie from "lottie-react";
import React from "react";
import loadingAnim from "../../animations/Lonely-404.json";

const ErrorLottie = () => {
  return (
    <div>
      <Lottie
        animationData={loadingAnim}
        loop={true}
        autoplay={true}
        className="w-full h-auto py-5"
      />
    </div>
  );
};

export default ErrorLottie;
