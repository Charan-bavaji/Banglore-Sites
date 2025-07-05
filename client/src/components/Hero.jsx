import React from 'react'
import hero_bg from '../assets/hero-bg.png';
import SearchBar from './SearchBar';
import Contact from './Contact';
import OtoB from './OtoB';
import DreamPlots from './DreamPlots';
const Hero = () => {
  return (
    <section className="relative w-full  bg-cover bg-center h-[50vh] md:h-[90vh]"
      style={{ backgroundImage: `url(${hero_bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <SearchBar />
      </div>
    </section>
  );
}

export default Hero;