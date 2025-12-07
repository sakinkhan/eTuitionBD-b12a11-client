import React from "react";
import welcomeAnim from "../../animations/Welcome.json";
import Lottie from "lottie-react";

const WelcomeLottie = () => {
  return (
    <div className="w-[450px] max-w-full mx-auto px-4 py-20">
      <Lottie
        animationData={welcomeAnim}
        loop={false}
        autoplay={true}
        className="w-full h-auto"
      />
    </div>
  );
};

export default WelcomeLottie;
