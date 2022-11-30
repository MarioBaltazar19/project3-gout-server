const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  followers: {
    type: Number,
  },
  genre: [String],
  profileimage: {
    type: String,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;
