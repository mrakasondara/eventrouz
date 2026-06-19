import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const favoriteEventsSchema = new Schema({
  event_id: {
    type: ObjectId,
    required: [true, "event favorite id is required"],
  },
  event_title: {
    type: String,
    required: [true, "event favorite title is required"],
  },
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    full_name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a valid gender option",
      },
      default: "male",
    },
    favorite_events: [favoriteEventsSchema],
  },
  { timestamps: true }
);

export const User = models.Users || model("Users", userSchema);
