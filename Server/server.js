const express = require('express')
const data = require('./data/users.json')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const approuter = require('./Router/AuthRoutes')
const Comment = require('./models/comments');

require('dotenv').config()
require('./models/dbConfig')

const PORT = process.env.PORT


app.use(express.json());

app.use(cors());

app.get("/", (req,res)=>{
    res.json(data)
})

app.use('/auth',approuter)

app.use(bodyParser.json())

app.post('/auth/api/comments', async (req, res) => {
    const { movieId, text, username } = req.body;
  
    try {
      const newComment = new Comment({ movieId, text, username });
      await newComment.save();
      res.status(201).json({ message: "Comment saved successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save comment" });
    }
  });
  app.get('/api/comments/:movieId', async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const comments = await Comment.find({ movieId }).sort({ createdAt: -1 });;
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });
// app.get('/api/average-rating/:movieId', async (req, res) => {
//   try {
//     const movieId = parseInt(req.params.movieId);
//     const ratings = await Rating.find({ id: movieId });

//     if (ratings.length === 0) {
//       return res.json({ averageRating: 0 });
//     }

//     const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
//     res.json({ averageRating });
//   } catch (err) {
//     console.error("Error fetching average rating:", err);
//     res.status(500).json({ error: "Failed to calculate average rating" });
//   }
// });


app.listen(PORT, ()=>{
    console.log('Server running')
})