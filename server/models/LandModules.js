const mongoose = require('mongoose');

const LandSchema = new mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    persqft: Number,
    area: Number,
    propertyType: String,
    approval: String,
    facing: String,
    ownerShip: String,
    amenitiesNearby: String,
    roadinfront: Number,
    waterandelectricity: String,
    distancefromL: String,
    emiloan: String,
    images: [String],
}, {
    timestamps: true
});

module.exports = mongoose.model("Land", LandSchema);
