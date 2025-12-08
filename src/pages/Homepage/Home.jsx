import React from "react";
import Hero from "./Hero";
import LatestTuitions from "./LatestTuitions/LatestTuitions";
import LatestTutors from "./LatestTutors/LatestTutors";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestTuitions></LatestTuitions>
      <LatestTutors></LatestTutors>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
