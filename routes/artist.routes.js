const router = require("express").Router();
const Artist = require("../models/Artist.model");


//Create artist route

router.post('/create', async (req,res,next)=>{
    try{
        const { name, description, genre, profileimage } = req.body;
        const newArtist = await Artist.create({
            name,
            description,
            genre,
            profileimage,
            
        })
        res.status(200).json(newArtist)
    }
    catch(error){
res.json(error)
next(error)

    } 
})


//get all artists route

router.get('/all', async (req,res,next)=>{
    try{
        const allArtists = await Artist.find()
        res.status(200).json(allArtists)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)


//get artist by id route 

router.get('/:id', async (req,res,next)=>{
    try{
        const artist = await Artist.findById(req.params.id)
        res.status(200).json(artist)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}
)

// delete artist by id route

router.delete('/delete/:id', async (req,res,next)=>{
    try{
        const artist = await Artist.findByIdAndDelete(req.params.id)
        res.status(200).json(artist)
    }
    catch(error){
        res.json(error)
        next(error)
    }
}   
)






module.exports = router;