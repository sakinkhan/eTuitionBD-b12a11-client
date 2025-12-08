import React from "react";
import Hero from "./Hero";
import LatestTuitions from "./LatestTuitions";
import LatestTutors from "./LatestTutors";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestTuitions></LatestTuitions>
      <LatestTutors></LatestTutors>
    </div>
  );
};

export default Home;
