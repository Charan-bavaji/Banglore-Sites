import React from "react";
import cornerImg from "../assets/Corner-Plots-In-Mysore 1.png";
import EastFSImg from "../assets/74769711_3_hatsAppImage20240905at13.05.311_180_240 1.png";
import GatedImg from "../assets/1714032894533PROXY-3faf3682 1.png";
import { Link } from "react-router-dom";
const OtoB = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 px-4">
      {/* Header Section */}
      <section className="bg-[#CCEC78] w-full md:w-[60%] py-10 rounded-3xl">
        <div className="flex flex-col items-center justify-center text-center gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
          <h1>O to B</h1>
          <h1>Owner to Buyer Process</h1>
        </div>

        <ul className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-base sm:text-lg md:text-xl font-medium px-6 text-gray-700">
          <li>1 - Choose a Land Here</li>
          <li>2 - Fill the Contact Form</li>
          <li>3 - Direct Land Visit With Owner</li>
        </ul>
      </section>

      {/* Plot Types Section */}
      <section className="py-12 w-full max-w-7xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10 text-center text-gray-800">
          Find Your Dream Plots
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <Link to="/lands" className="w-full max-w-[350px] text-center">
            <div>
              <img
                src={cornerImg}
                alt="Corner Plots"
                className="rounded-xl w-full h-[160px] object-cover shadow"
              />
              <p className="mt-3 text-sm font-medium text-gray-800">
                Corner Plots
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/lands" className="w-full max-w-[350px] text-center">
            <div>
              <img
                src={EastFSImg}
                alt="East Facing Plots"
                className="rounded-xl w-full h-[160px] object-cover shadow"
              />
              <p className="mt-3 text-sm font-medium text-gray-800">
                East Facing Plots
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/lands" className="w-full max-w-[350px] text-center">
            <div>
              <img
                src={GatedImg}
                alt="Gated Plots"
                className="rounded-xl w-full h-[160px] object-cover shadow"
              />
              <p className="mt-3 text-sm font-medium text-gray-800">
                Gated Plots
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OtoB;
