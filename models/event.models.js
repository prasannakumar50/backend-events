const mongoose = require("mongoose")


const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    sessionTimings:[{
        type:String,
        required: true
    }],
    speakers:[{
        type:String
    }],
    price: {
        type: Number,
        default: 0      
    },
    venue:String,
    tags:[{
        type:String
    }],
    eventType:{
        type:String,
        enum:["Online", "Offline"]
    },
    date: {
        type: String,
        required: true,             
    },

    imageUrl: {
        type: String,  
        required: true, 
    },

},{ timestamps: true })

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;