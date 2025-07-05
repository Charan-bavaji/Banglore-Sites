import React from "react";

const Filter = ({ filters, setFilters }) => {
  // Generic handler for checkbox changes
  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value) // Remove
      : [...currentValues, value]; // Add

    setFilters((prev) => ({
      ...prev,
      [category]: newValues,
    }));
  };

  // Handler for price slider
  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: Number(e.target.value),
    }));
  };

  return (
    <div className="bg-[#ebffe6] p-4 rounded-2xl w-full lg:w-64 space-y-6 border text-sm">
      {/* Localities */}
      <div>
        <h3 className="font-semibold mb-2">Localities</h3>
        <div className="space-y-1">
          {["Jigani", "Anekal", "Bannerghatta", "Athibele"].map((item) => (
            <label key={item} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.localities?.includes(item)}
                onChange={() => handleCheckboxChange("localities", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <hr />

      {/* Property Type */}
      <div>
        <h3 className="font-semibold mb-2">Property type</h3>
        <div className="space-y-1">
          {["Residential", "Commercial", "Agricultural"].map((item) => (
            <label key={item} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.propertyTypes?.includes(item)}
                onChange={() => handleCheckboxChange("propertyTypes", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <hr />

      {/* Price Slider */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex justify-between text-xs mb-1 text-gray-600">
          <span>5 Lac</span>
          <span className="bg-lime-300 px-2 py-0.5 rounded font-semibold text-black">
            ₹{filters.price || 20}L
          </span>
          <span>5 Cr</span>
        </div>
        <input
          type="range"
          min="5"
          max="500"
          value={filters.price || 20}
          onChange={handlePriceChange}
          className="w-full accent-lime-500"
        />
      </div>

      <hr />

      {/* Plot Area */}
      <div>
        <h3 className="font-semibold mb-2">Plot area</h3>
        <div className="space-y-1">
          {["600", "1500", "2400+", "Acre"].map((item) => (
            <label key={item} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.plotAreas?.includes(item)}
                onChange={() => handleCheckboxChange("plotAreas", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <hr />

      {/* Approval */}
      <div>
        <h3 className="font-semibold mb-2">Approval</h3>
        <div className="space-y-1">
          {["BMRDA", "BDA", "DC converted", "A-khata", "E-khata"].map((item) => (
            <label key={item} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.approvals?.includes(item)}
                onChange={() => handleCheckboxChange("approvals", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
