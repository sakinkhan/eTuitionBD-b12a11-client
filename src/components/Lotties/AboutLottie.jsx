import Lottie from "lottie-react";
import React from "react";
import animation from "../../animations/about-us.json";

const AboutLottie = () => {
  return (
    <div style={{ width: 360, margin: "0 auto" }}>
      <Lottie
        animationData={animation}
        loop={false}
        autoplay={true}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default AboutLottie;
