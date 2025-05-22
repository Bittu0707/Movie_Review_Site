const Joi = require('joi')
const signupValidation = (req,res,next) => {
    const signupSchema = Joi.object({
        username : Joi.string().min(5).max(20).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(20).required()
    })
    const {error} = signupSchema.validate(req.body)
    if(error) {
        return res.status(404)
        .json({message:"error occured",error})
    }
    next();
}
const loginValidation = (req,res,next) => {
    const loginSchema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(20).required()
    })
    const {error} = loginSchema.validate(req.body)
    if(error) {
        return res.status(404)
        .json({message:"error occured",error})
    }
    next();
}
module.exports = {
    loginValidation,
    signupValidation
}