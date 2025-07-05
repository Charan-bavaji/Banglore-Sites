import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const LandDetailedCard = ({ land }) => {
  const {
    title,
    location,
    price,
    persqft,
    area,
    amenitiesNearby,
    images,
  } = land;

  return (
    <Link to={"/land-details/${land._id}"} className="flex flex-col sm:flex-row bg-[#ebffe6] border rounded-xl p-4 gap-4 w-full">
      {/* Image */}
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <img
          src={images?.[0] || "/default-land.jpg"} // fallback if no image
          alt="Land"
          className="w-44 h-48 object-cover rounded-lg border"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-semibold text-lg text-gray-800">
            {location}
          </h2>
          <p className="text-sm text-gray-600">
            {title}
          </p>

          <div className="flex flex-wrap gap-6 mt-2 text-sm font-medium">
            <div>
              ₹ {price?.toLocaleString()}
              <div className="text-xs text-gray-500 font-normal">
                {persqft} / sqft
              </div>
            </div>
            <div className="hidden sm:block border-l h-6" />
            <div>
              {area} sqft
              <div className="text-xs text-gray-500 font-normal">Plot area</div>
            </div>
          </div>

          <div className="mt-3 text-sm">
            <p>
              <span className="font-medium">Nearby:</span> {amenitiesNearby}
            </p>
            <p className="mt-1">
              <span className="font-medium">Description:</span> Beautiful plot with prime access and modern surroundings.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            to={`/land-details/${land._id}`}
            className="border border-gray-600 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer"
          >
            <button>View Details</button>
          </Link>

          <HashLink
            key={"Contact"}
            to={"/#contact"}
            className="bg-green-800 text-white px-5 py-1 rounded-md text-sm font-medium hover:bg-green-900 cursor-pointer"
          >
            <button>Contact</button>
          </HashLink>
        </div>
      </div>
    </Link>
  );
};

export default LandDetailedCard;
