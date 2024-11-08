const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hostedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sessionTimings: [{
        sessionTitle: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }],
    speakers: [{
        name: { type: String, required: true },
        role: { type: String, required: true },
        profileImageUrl: { type: String }
    }],
    price: {
        type: Number,
        default: 0
    },
    venue: String,
    tags: [{
        type: String
    }],
    eventType: {
        type: String,
        enum: ["Online", "Offline"]
    },
    date: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    performers: [{
        name: { type: String, required: true },
        role: { type: String, required: true },
        profileImageUrl: { type: String }
    }]
    
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
