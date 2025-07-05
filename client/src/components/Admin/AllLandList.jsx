import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AllLandList = () => {
  const [lands, setLands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLands = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/v1/landslist");
        console.log("Fetched lands:", res.data);
        setLands(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch lands ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
  }, []);


  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this land?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/deleteLand/${id}`);
      setLands((prevLands) => prevLands.filter((land) => land._id !== id));
      toast.success("Land deleted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete land ❌");
    }
  };

  const filteredLands = lands.filter(
    (land) =>
      land?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentLands = filteredLands.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold">All Listed Lands</h2>
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-80"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">Loading lands...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLands.map((land, index) => (
                  <tr key={land._id} className="border-t">
                    <td className="px-4 py-2">{startIdx + index + 1}</td>
                    <td className="px-4 py-2">{land.title}</td>
                    <td className="px-4 py-2">₹ {land.price}</td>
                    <td className="px-4 py-2">{land.location}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(land._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {currentLands.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                      No lands found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </>
      )}
    </div>
  );
};

export default AllLandList;
