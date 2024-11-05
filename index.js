const express = require('express')
const app = express();
const {initializeDatabase} =  require("./db/db.connect")
const Event = require("./models/event.models")


app.use(express.json())

initializeDatabase()

// const newEvent = {
//   title: "Future of Robotics Summit",
//   description: "An immersive summit exploring the advancements in robotics, automation, and artificial intelligence impacting various industries.",
//   sessionTimings: ["9:30 AM - 11:00 AM", "12:30 PM - 2:00 PM", "3:00 PM - 4:30 PM"],
//   speakers: ["Sophia the Robot", "Bill Gates"],
//   price: 120,
//   venue: "Tech Innovation Hub, Seattle, WA",
//   tags: ["Robotics", "Automation", "AI", "Future Tech"],
//   eventType: "Offline",
//   date: "2024-06-20T09:30:00Z",
//   imageUrl: "https://plus.unsplash.com/premium_photo-1681562502996-bcfad45d4def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
// }

async function createEvent(newEvent){
   try{
      const event =  new Event(newEvent)
      const saveEvent = await event.save()
      return saveEvent
   }catch(error){
    throw error
   }
}

app.post("/events", async(req, res)=>{
  try{
     const savedEvent = await createEvent(req.body)
     res.status(201).json({message: "Event saved successfully", event: savedEvent})
  }catch(error){
    res.status(500).json({error: "Failed to add event"})
  }
})



async function readByEventTitle(eventTitle){
    try{
      const event = await Event.findOne({title: eventTitle})
      return event
    }catch(error){
       throw error
    }
}

app.get("/events/:title", async(req, res)=>{
    try{
     const event = await readByEventTitle(req.params.title)
     if(event){
        res.json(event)
     }else{
        res.status(404).json({error: 'Event not found'})
     }
    }catch(error){
        res.status(500).json({error: 'Failed to fetch events'})
    }
})


async function readAllEvents() {
    try{
      const event = await Event.find()
      return event
    }catch(error){
      throw error
    }
}

app.get("/events", async(req, res)=>{
    try{
      const event = await readAllEvents()
      if(event){
        res.json(event)
      }else{
        res.status(404).json({error: 'Event Not found'})
      }
    }catch(error){
        throw error
    }
})

async function updateEvent(eventId, dataToUpdate){
  try{
     const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, {new: true})
     return updatedEvent
  }
  catch(error){
    console.log("Error in updating Event", error)
  }
}

app.post("/events/:eventId", async(req, res)=>{
  try{
    const updatedEvent = await updateEvent(req.params.eventId, req.body)
    if(updatedEvent){
      res.status(200).json({message: 'Event updated successfully', updatedEvent: updatedEvent })
    }else{
      res.status(404).json({error: 'Event not found'})
    }
  }catch(error){
     res.json(500).json({error: 'Failed to update event'})
  }
})



const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})



