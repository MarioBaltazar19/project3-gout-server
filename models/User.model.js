const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

   

   

    // create CreatedFavList 

    eventFavList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
