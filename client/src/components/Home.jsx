import React from "react";
import Hero from "./Hero";
import DreamPlots from "./DreamPlots";
import Contact from "./Contact";
import OtoB from "./OtoB";
import Construction from "./Construction";
import ListForm from "./Admin/Model/ListForm";

const Home = () => {
  return (
    <div>
      <Hero />
      <DreamPlots />
      <Contact />
      <OtoB />
      <Construction />
    </div>
  );
};

export default Home;