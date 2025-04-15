import mongoose from "mongoose";

const gameSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
      platform: [
        {
          type: String,
          required: true,
        },
      ],
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      developer: {
        type: String,
        required: true,
      },
      publisher: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Game = mongoose.model('Game', gameSchema);
  export default Game;