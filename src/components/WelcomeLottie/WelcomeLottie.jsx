import React, { useRef } from "react";
import welcomeAnim from "../../animations/Welcome.json";
import Lottie from "lottie-react";

const WelcomeLottie = () => {
  const lottieRef = useRef(null);
  return (
    <div style={{ width: 300, margin: "0 auto" }}>
      <Lottie>
        lottieRef={lottieRef}
        animationData={welcomeAnim}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "auto" }}
      </Lottie>
    </div>
  );
};

export default WelcomeLottie;
