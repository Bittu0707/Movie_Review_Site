const { compare } = require('bcrypt');
const usermodel = require('../models/users')
const jwt = require('jsonwebtoken');
const Rating = require('../models/reviews');
// const { hash } = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await usermodel.findOne ({ email });
        // const hashedPassword = await hash(password, 10);
        if (existingUser) {
            return res.send("user already exists")
        }
        const mymodel = await usermodel.create({ username, email, password })
        res.status(200).json({
            message: "Signup success",
            success: true,
        })
        mymodel.save()
    } catch (err) {
        console.log("Error in signup", err)
        res.send("Error in controller")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await usermodel.findOne({ email })
        if (!existingUser) {
            return res.send("User not exist, please signup")
        }
        const isPass = password === existingUser.password
        // const isPass = await bcrypt.compare(password,existingUser.password);
        // const isPass = await compare(password, existingUser.password);

        if (!isPass) {
            return res.status(403).json({ message: "Password is incorrect" })
        }
        
        const jwtToken = jwt.sign(
            {
                email: existingUser.email,
                _id: existingUser._id
            },
            process.env.JWT_SECRET_KEY || "default_secret",
            { expiresIn: "24h" }
        );
        return res.status(200).json({
            message: "Login success",
            success: true,
            jwtToken,
            email: existingUser.email,
            name: existingUser.username
        })
    } catch (err) {
        console.error("Login error", err);
        return res.status(500).json({ messgae: "Internal server error" });
    }
}

const rating = async (req, res) => {
    try {
      const { id, username, rating } = req.body;
  
      if (!id || !username || !rating) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      let existingRating = await Rating.findOne({ id, username });
  
      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
        res.json({ message: "Rating updated successfully" });
      } else {
        const newRating = new Rating({ id, username, rating });
        await newRating.save();
        res.json({ message: "Rating saved successfully" });
      }
    } catch (error) {
      console.error("Error in rating:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const getAverageRating = async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const ratings = await Rating.find({ id: movieId });
  
      if (ratings.length === 0) {
        return res.json({ averageRating: 0 });
      }
  
      const averageRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  
      res.json({ averageRating });
    } catch (err) {
      console.error("Error fetching average rating:", err);
      res.status(500).json({ error: "Failed to calculate average rating" });
    }
  };

module.exports = { signup, login, rating, getAverageRating }