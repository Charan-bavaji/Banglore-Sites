import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const SearchBar = () => {
  //   const [city, setCity] = useState("Bangaluru");
  //   const [landType, setLandType] = useState("Land/Plots");
  const [residential, setResidential] = useState(true);
  const [commercial, setCommercial] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-black/10 backdrop-blur-xs rounded-2xl shadow-lg px-4 py-6 w-full space-y-4 text-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* City Dropdown (Static) */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Bengaluru</span>
        </div>

        {/* Land Type Dropdown (Static) */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="font-medium ">Land/Plots</span>
          <ChevronDown size={16} className="" />
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-white rounded-md px-4 py-2 w-full md:flex-1">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for bengaluru lands..."
            className="w-full outline-none bg-transparent text-gray-800"
          />
        </div>

        {/* Search Button */}
        <button className="bg-black cursor-pointer text-white px-6 py-2 rounded-full hover:bg-green-800 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          Search
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="flex items-center gap-4 px-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={residential}
              onChange={() => setResidential(!residential)}
              className="accent-green-900"
            />
            Residential
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={commercial}
              onChange={() => setCommercial(!commercial)}
              className="accent-green-900"
            />
            Commercial
          </label>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
