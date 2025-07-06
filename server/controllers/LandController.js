const Lands = require("../models/LandModules.js");
exports.getAllLands = async (req, res) => {
    try {
        const { location, price, minArea, maxArea, propertyType, approval, facing, sortBy } = req.query;
        let query = {};

        // Applying Filters
        if (location) query.location = location;
        if (price) query.price = price;
        const lands = await Lands.find(query);
        res.json(lands);

    } catch (error) {
        res.status(500).json({ message: "Error featching Land Listings", error });
    }
}

exports.getTopLands = async (req, res) => {

    try {
        const topLands = await Lands.find().sort({ createdAt: -1 }).limit(6);
        res.status(200).json(topLands);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching top lands", error });
    }
};



exports.addLand = async (req, res) => {
    try {
        const {
            title, location, price, persqft, area, propertyType,
            approval, facing, ownerShip, amenitiesNearby,
            roadinfront, waterandelectricity, distancefromL, emiloan
        } = req.body;

        // Get secure Cloudinary URLs
        const images = req.files.map(file => file.path); // file.path is now a URL

        const landDetails = {
            title, location, price, persqft, area, propertyType,
            approval, facing, ownerShip, amenitiesNearby,
            roadinfront, waterandelectricity, distancefromL, emiloan,
            images
        };

        await Lands.create(landDetails);
        return res.status(200).json({ message: "Successfully listed land" });
    } catch (error) {
        return res.status(500).json({ message: "Error adding land", error });
    }
};

exports.getLandDetails = async (req, res) => {
    try {
        const land = await Lands.findById(req.params.id);

        if (!land) {
            return res.status(404).json({ success: false, message: "Land not found" });
        }

        return res.status(200).json({
            success: true,
            land,
        });
    } catch (error) {
        console.error("Error fetching land:", error);
        return res.status(500).json({ success: false, message: "Error loading land details" });
    }
};


exports.updateLand = async (req, res) => {
    try {
        const landId = req.params.id;
        const updatedData = req.body;

        const updatedLand = await Lands.findByIdAndUpdate(landId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedLand) {
            return res.status(404).json({ message: "Land not found" });
        }
        res.status(200).json({ message: "Land updated successfully", updatedLand });
    } catch (error) {
        res.status(500).json({ message: "Error updating land", error });
    }
}

exports.deleteLand = async (req, res) => {

    try {
        const landId = req.params.id;
        const deleteLand = await Lands.findByIdAndDelete(landId);

        if (!deleteLand) {
            return res.status(404).json({ message: "Land not found" });
        }
        res.status(200).json({ message: "Land deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting land", error });
    }
}
