import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';







const ListForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        persqft: '',
        area: '',
        propertyType: '',
        approval: '',
        facing: '',
        ownerShip: '',
        amenitiesNearby: '',
        roadinfront: '',
        waterandelectricity: '',
        distancefromL: '',
        emiloan: '',
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert('You can only upload up to 5 images.');
            return;
        }

        setImages((prev) => [...prev, ...files]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = new FormData();
        for (let key in formData) {
            submissionData.append(key, formData[key]);
        }
        images.forEach((image) => {
            submissionData.append('images', image);
        });

        try {
            const res = await axios.post('http://localhost:5000/api/v1/addLand', submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Land listed successfully ✅');
            console.log(res.data);

            // Reset form
            setFormData({
                title: '',
                location: '',
                price: '',
                persqft: '',
                area: '',
                propertyType: '',
                approval: '',
                facing: '',
                ownerShip: '',
                amenitiesNearby: '',
                roadinfront: '',
                waterandelectricity: '',
                distancefromL: '',
                emiloan: '',
            });
            setImages([]);
            setImagePreviews([]);
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit ❌');
        } finally {
            setLoading(false);
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-semibold">List a New Land</h2>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    'title',
                    'location',
                    'price',
                    'persqft',
                    'area',
                    'propertyType',
                    'approval',
                    'facing',
                    'ownerShip',
                    'amenitiesNearby',
                    'roadinfront',
                    'waterandelectricity',
                    'distancefromL',
                    'emiloan',
                ].map((field) => (
                    <input
                        key={field}
                        type={['price', 'persqft', 'area', 'roadinfront'].includes(field) ? 'number' : 'text'}
                        name={field}
                        placeholder={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                ))}
            </div>

            {/* Image Upload */}
            <div>
                <label className="block font-medium mb-2">Upload up to 5 images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full border rounded px-3 py-2"
                />
                <div className="mt-4 flex flex-wrap gap-4">
                    {imagePreviews.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded shadow"
                        />
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                    </>
                ) : (
                    'Submit'
                )}
            </button>

        </form>
    );
};

export default ListForm;
