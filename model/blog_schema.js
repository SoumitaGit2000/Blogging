const { Schema, model } = require("mongoose") 
const blogSchema = new Schema({    
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        default: "https://www.openpr.com/wiki/images/269-400x300_4874.jpg" // Default image URL
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user", // Reference to the User model
    }
},{timestamps: true}) // createdAt and updatedAt fields

const Blog = model("blog", blogSchema)

module.exports = Blog