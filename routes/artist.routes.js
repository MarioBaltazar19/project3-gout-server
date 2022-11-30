const router = require("express").Router();
require("dotenv").config();
const Artist = require("../models/Artist.model");
const Event = require("../models/Event.model");

//Config Spotify API
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

//Create artist route
router.post("/create/:eventId/:artistName", async (req, res, next) => {
  try {
    const { eventId, artistName } = req.params;
    const foundArtist = await spotifyApi.searchArtists(artistName);
    const artistInfo = foundArtist.body.artists.items;

    const newArtist = await Artist.create({
      name: artistInfo[0].name,

      followers: artistInfo[0].followers.total,
      genre: artistInfo[0].genres,
      profileimage: artistInfo[0].images[1].url,
    });

    const updateEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $push: { artists: newArtist._id },
      },
      { new: true }
    );
    const updateArtist = await Artist.findByIdAndUpdate(newArtist._id, {
      $push: { events: eventId },
    });

    res.status(200).json(newArtist);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

//get all artists route

router.get("/all", async (req, res, next) => {
  try {
    const allArtists = await Artist.find().populate("events");
    res.status(200).json(allArtists);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

//get artist by id route

router.get("/:id", async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("events")
    res.status(200).json(artist);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

// delete artist by id route

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    res.status(200).json(artist);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

// Update artist by id route

router.put("/update/:id", async (req, res, next) => {
    try {
        const { events } = req.body;
        const artist = await Artist.findByIdAndUpdate(req.params.id, {
           
            events
        }, { new: true })
        res.status(200).json(artist)
    }
    catch (error) {
        res.json(error)
        next(error)
    }
})



module.exports = router;
