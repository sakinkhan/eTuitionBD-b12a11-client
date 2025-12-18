import React from "react";
import Hero from "./Hero";
import LatestTuitions from "./LatestTuitions/LatestTuitions";
import LatestTutors from "./LatestTutors/LatestTutors";
import WhyChooseUs from "./WhyChooseUs";
import HowPlatformWorks from "./HowPlatformWorks";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestTuitions></LatestTuitions>
      <WhyChooseUs></WhyChooseUs>
      <LatestTutors></LatestTutors>
      <HowPlatformWorks></HowPlatformWorks>
    </div>
  );
};

export default Home;
