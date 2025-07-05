import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import LandDetailedCard from "./LandDetailedCard";
import { SlidersHorizontal } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const LandList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");

  const [filters, setFilters] = useState({
    localities: [],
    propertyTypes: [],
    price: 500, // max default
    area: [],
    approval: [],
  });

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLands = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/v1/landslist");
        setLands(res.data);
        setFilteredLands(res.data);
      } catch (err) {
        toast.error("Failed to fetch lands");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
  }, []);
  console.log(lands, filteredLands, "landsData")
  useEffect(() => {
    const applyFilters = () => {
      const cityFiltered = cityParam
        ? lands.filter((land) =>
          land.location?.toLowerCase().includes(cityParam.toLowerCase() || "")
        )
        : lands;

      const result = cityFiltered.filter((land) => {
        const matchesLocality =
          filters.localities.length === 0 ||
          filters.localities.includes(land.location);

        const matchesProperty =
          filters.propertyTypes.length === 0 ||
          filters.propertyTypes.includes(land.propertyType);

        const matchesPrice = land.price <= filters.price * 100000;

        const matchesArea =
          filters.area.length === 0 ||
          filters.area.some((a) => {
            const areaVal = parseInt(land.area);
            if (a === "600") return areaVal <= 600;
            if (a === "1500") return areaVal > 600 && areaVal <= 1500;
            if (a === "2400+") return areaVal > 1500;
            if (a === "Acre") return areaVal >= 43560;
            return false;
          });

        const matchesApproval =
          filters.approval.length === 0 ||
          filters.approval.includes(land.approval);

        return (
          matchesLocality &&
          matchesProperty &&
          matchesPrice &&
          matchesArea &&
          matchesApproval
        );
      });

      setFilteredLands(result);
      setCurrentPage(1);
    };

    applyFilters();
  }, [filters, lands, cityParam]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentLands = filteredLands.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mt-24 px-4 flex justify-center mb-3">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl">
        {/* Filter Toggle Button (mobile only) */}
        <div className="lg:hidden flex justify-end mb-2">
          <button
            className="flex items-center gap-2 bg-[#eaeee9] text-gray-700 px-4 py-2 rounded-md border hover:bg-lime-100"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>
        </div>

        {/* Filter Sidebar */}
        {showFilter && <div className="lg:hidden"><Filter setFilters={setFilters} filters={filters} /></div>}
        <div className="hidden lg:block">
          <Filter setFilters={setFilters} filters={filters} />
        </div>

        {/* Land Cards + Pagination */}
        <div className="flex-grow space-y-6">
          {loading ? (
            <div className="text-center py-10">Loading lands...</div>
          ) : (
            <>
              {currentLands.map((land) => (
                <LandDetailedCard key={land._id} land={land} />
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandList;
