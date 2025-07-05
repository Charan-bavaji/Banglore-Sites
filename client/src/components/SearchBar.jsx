import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cities = ["Bangalore", "Anekal", "Jigani", "Bannerghatta", "Attibele"];
const landTypes = ["Residential", "Commercial"];

const SearchBar = () => {
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [selectedType, setSelectedType] = useState("Residential");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/lands?city=${selectedCity}&type=${selectedType}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-4 py-4 md:px-6 md:py-5 w-fit text-black">
      <div className="flex flex-row md:flex-row items-center gap-2 md:gap-4 text-sm md:text-base">

        {/* City Dropdown */}
        <div className="relative w-fit">
          <div
            className="flex items-center justify-between border px-3 py-1.5 md:px-4 md:py-2 rounded-md cursor-pointer min-w-[100px] md:min-w-[150px]"
            onClick={() => setShowCityDropdown(!showCityDropdown)}
          >
            <span className="truncate">{selectedCity}</span>
            <ChevronDown size={14} className="ml-1" />
          </div>
          {showCityDropdown && (
            <ul className="absolute z-10 bg-white text-black mt-2 rounded shadow-md min-w-[100px] md:min-w-[150px]">
              {cities.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                  className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-green-800 transition duration-300 text-sm md:text-base"
        >
          Search
        </button>
      </div>
    </div>

  );
};

export default SearchBar;
