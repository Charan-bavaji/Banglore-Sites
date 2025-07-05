import React, { useEffect, useState } from "react";
import LandCard from "./LandCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DreamPlots = () => {
  const [topLands, setTopLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopLands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/getToplands");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch top lands");
        setTopLands(data);
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTopLands();
  }, []);

  return (
    <div className="py-10 px-4 my-10">
      <div className="max-w-6xl mx-auto text-start">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Find Your Dream Plots
        </h1>

        {/* Loader */}
        {loading ? (
          <p className="text-center text-gray-500">Loading top lands...</p>
        ) : (
          <section className="flex flex-wrap gap-6 justify-center items-center">
            {topLands.length > 0 ? (
              topLands.map((land) => (
                <div key={land._id} onClick={() => navigate(`/land-details/${land._id}`)}>
                  <LandCard land={land} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No top lands available.</p>
            )}
          </section>
        )}
      </div>

      <div className="flex justify-center items-center mt-10">
        <button
          onClick={() => navigate("/lands")}
          className="bg-[#7a9b00] hover:bg-lime-800 text-black font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition"
        >
          View More <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default DreamPlots;
