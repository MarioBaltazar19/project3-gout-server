const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            
        },
        description: {
            type: String,
            
        },
        genre: {
            type: String,
            
        },
        profileimage: {
            type: String,
        
        },
        events: {
            type: String,
            
        }
    },
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;

        