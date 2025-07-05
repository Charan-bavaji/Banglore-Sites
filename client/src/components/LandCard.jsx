import { Heart } from "lucide-react";

const LandCard = ({ land }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border max-w-xs w-full hover:cursor-pointer hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-72 sm:w-80">
        <img
          src={land?.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={land?.title}
          className="h-40 w-full object-cover rounded-t-xl"
        />
      </div>


      {/* Details */}
      <div className="p-4 space-y-1 text-sm text-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-black">{land.title}</h3>
            <p className="text-xs text-gray-500 truncate max-w-[140px]">
              {land.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-black">{land.area} sq.ft</p>
            <p className="text-xs text-gray-500">Ready to move</p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs mt-2">
              <span className="font-semibold text-black">{land.approval}</span>{" "}
              <span className="inline-block text-blue-500 ml-1">🔵</span>
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[140px]">
              Nearby: {land.amenitiesNearby || "school, metro, highway"}
            </p>
          </div>
          <div className="flex flex-col justify-between items-center mt-2">
            <p className="text-lg font-semibold text-black">₹ {land.price}</p>
            <p className="text-xs text-gray-500">
              {land.persqft} / sqft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandCard;
