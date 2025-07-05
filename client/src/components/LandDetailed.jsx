import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mainImg from "../assets/Mainimage.png"; // fallback
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";

const LandDetailed = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/landDetails/${id}`);
        setLand(res.data?.land);
        console.log(res.data?.land);
      } catch (error) {
        console.error("Failed to fetch land details", error);
      }
    };

    fetchLand();
  }, [id]);

  if (!land) {
    return <div className="text-center mt-32">Loading land details...</div>;
  }

  return (
    <div className="w-full px-4 py-10 bg-[#f9f7f0] flex flex-col gap-6 max-w-5xl mx-auto mt-28">
      {/* Image Gallery */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3">
            <img
              src={land.images?.[0] || mainImg}
              alt="main"
              className="w-full rounded-xl h-[250px] object-cover"
            />
          </div>
          {land.images?.slice(1, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              className="rounded-lg h-[80px] w-full object-cover"
              alt={`thumbnail ${index}`}
            />
          ))}
          {/* Fill up with defaults if less than 3 */}
          {[...Array(3 - (land.images?.slice(1).length || 0))].map((_, idx) => (
            <img
              key={`fallback-${idx}`}
              src={[img1, img2, img3][idx]}
              className="rounded-lg h-[80px] w-full object-cover"
              alt="fallback"
            />
          ))}
        </div>
      </div>

      {/* Details and Contact */}
      <div className="flex flex-col md:flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4 order-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {land.location}
              </h1>
              <p className="text-sm font-medium text-gray-700">
                {land.title}
              </p>
              <p className="text-xs text-gray-500">
                Description: This plot is located at {land.location}. {land.amenitiesNearby}.
              </p>
            </div>
            <div className="text-right space-y-1">
              <h2 className="text-lg font-semibold">₹ {land.price?.toLocaleString()}</h2>
              <p className="text-sm text-gray-600">{land.persqft} / sqft</p>
              <p className="text-sm font-medium">{land.area} sqft</p>
              <p className="text-xs text-gray-500">Plot area</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <ul className="space-y-2">
              <li>📍 {land.location} — {land.amenitiesNearby}</li>
              <li>💧 {land.waterandelectricity}</li>
              <li>💰 EMI / Loan: {land.emiloan}</li>
            </ul>
            <ul className="space-y-2">
              <li>🌅 {land.facing} Facing</li>
              <li>📏 Road: {land.roadinfront} ft</li>
              <li>✅ Approved by: {land.approval}</li>
              <li>📜 Ownership: {land.ownerShip}</li>
            </ul>
          </div>
        </div>

        {/* Contact Form (untouched) */}
        <div className="w-full lg:w-[350px] border border-gray-300 rounded-xl p-4 shadow-md bg-white order-2">
          <h3 className="text-lg font-semibold mb-1">Contact us / Enquiry</h3>
          <p className="text-xs text-gray-400 mb-3">no unwanted calls or sms</p>
          <form className="flex flex-col gap-3 text-sm">
            <div>
              <label className="font-medium">Name <span className="text-red-600">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-1 mt-1" placeholder="First name" />
            </div>
            <div>
              <label className="font-medium">Email <span className="text-red-600">*</span></label>
              <input type="email" className="w-full border rounded px-3 py-1 mt-1" placeholder="youremail@gmail.com" />
            </div>
            <div>
              <label className="font-medium">Phone Number <span className="text-red-600">*</span></label>
              <input type="tel" className="w-full border rounded px-3 py-1 mt-1" placeholder="91+ 000 000 0000" />
            </div>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white py-1 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandDetailed;
