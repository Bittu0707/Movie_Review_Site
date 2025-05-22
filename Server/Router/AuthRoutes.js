const { signup, login, getAverageRating } = require('../controllers/AuthControl')
const { signupValidation, loginValidation } = require('../Middleware/authMiddleware')
const { rating } = require('../controllers/AuthControl');
const ratingController = require('../controllers/AuthControl');

const router = require('express').Router()
// const { user, rating, comment } = req.body;
// router.post('/login',(req,res)=>{
//     res.send("Login Success")
// })
// router.post('/signup',(req,res)=>{
//     res.send("Signup Success")
// })
// router.post('/movies/:id/reviews', async (req, res) => {
// try{
// // movie.reviews.push({ user, rating, comment });
// const totalRatings = movie.reviews.reduce((acc, review) => acc + review.rating, 0);
//     movie.averageRating = totalRatings / movie.reviews.length;

//     await movie.save();
//     res.status(200).json({ message: 'Review added successfully', movie });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/api/ratings', rating)
router.get('/api/average-rating/:movieId', ratingController.getAverageRating);
router.post('/signup',signupValidation,signup)
router.post('/login',loginValidation,login)
module.exports = router