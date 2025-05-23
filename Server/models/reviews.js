const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    id: Number,
    username: String,
    rating: Number
})

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;