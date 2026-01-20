import React from "react";
import Hero from "./Hero";
import LatestTuitions from "./LatestTuitions/LatestTuitions";
import LatestTutors from "./LatestTutors/LatestTutors";
import WhyChooseUs from "./WhyChooseUs";
import HowPlatformWorks from "./HowPlatformWorks";
import PlatformStatistics from "./PlatformStatistics/PlatformStatistics";
import FeaturedSuccessStories from "./FeaturedSuccessStories/FeaturedSuccessStories";
import TuitionCategories from "./TuitionCategories/TuitionCategories";
import Newsletter from "./Newsletter/Newsletter";
import TakeNextStep from "./TakeNextStep/TakeNextStep";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestTuitions></LatestTuitions>
      <WhyChooseUs></WhyChooseUs>
      <LatestTutors></LatestTutors>
      <PlatformStatistics></PlatformStatistics>
      <TakeNextStep></TakeNextStep>
      <FeaturedSuccessStories></FeaturedSuccessStories>
      <TuitionCategories></TuitionCategories>
      <Newsletter></Newsletter>
      <HowPlatformWorks></HowPlatformWorks>
    </div>
  );
};

export default Home;
