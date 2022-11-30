const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  genre: {
    type: String,
  },
  image: {
    type: String,
  },

  creator: {
    type: Schema.Types.ObjectId,
      ref: "User",
  },

  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
});

const Event = model("Event", eventSchema);

module.exports = Event;
