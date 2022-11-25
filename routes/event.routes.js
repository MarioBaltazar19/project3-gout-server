const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model");


//Create event route

router.post('/create', async (req,res,next)=>{
    try{
        const { title, genre, image, description, location, date } = req.body;
        const newEvent = await Event.create({
            title,
            genre,
            image,
            description,
            location,
            date
        })
        res.status(200).json(newEvent)
    }
    catch(error){
res.json(error)
next(error)
    }
})

// get all events route 

router.get('/all', async (req,res,next)=>{
    try{
        const allEvents = await Event.find()
        res.status(200).json(allEvents)
    }
    catch(error){
        res.json(error)
        next(error)
    }
})


//get event by id route

router.get('/:id', async (req,res,next)=>{
    try{
        const event = await Event.findById(req.params.id)
        res.status(200).json(event)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)


//get event by genre route 

router.get('/genre/:genre', async (req,res,next)=>{
    try{
        const genre = req.params.genre
        const events = await Event
        .find
        ({genre})
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)


//get events by artist route 

router.get('/artist/:id', async (req,res,next)=>{
    try{
        const artist = req.params.id
        const events = await Event
        .find
        ({artists: artist})
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)


//get events by location route 

router.get('/location/:location', async (req,res,next)=>{
    try{
        const location = req.params.location
        const events = await Event
        .find
        ({location})
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)


//get events by date route

router.get('/date/:date', async (req,res,next)=>{

    try{
        const date = req.params.date
        const events = await Event
        .find
        ({date})
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)

//get events by title route 

router.get('/title/:title', async (req,res,next)=>{
    try{
        const title = req.params.title
        const events = await Event
        .find
        ({title})
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)

//get top 10 events route 

router.get('/top10', async (req,res,next)=>{
    try{
        const events = await Event.find().sort({date: -1}).limit(10)
        res.status(200).json(events)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)

//update event route

router.put('/update/:id', async (req,res,next)=>{
    try{
        const { title, genre, image, description, artists, location, date } = req.body;
        const event = await Event.findByIdAndUpdate(req.params.id, {
            title,
            genre,
            image,
            description,
            artists,
            location,
            date
        })
        res.status(200).json(event)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)

//delete event route 

router.delete('/delete/:id', async (req,res,next)=>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id)
        res.status(200).json(event)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)



module.exports = router;




