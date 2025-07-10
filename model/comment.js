const { Schema, model } = require("mongoose") 
const commentSchema = new Schema({    
    blogId:{
        type:Schema.Types.ObjectId,
        ref: 'blog'
    },
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user", // Reference to the User model
    }
},{timestamps: true}) // createdAt and updatedAt fields

const Comment = model("comment", commentSchema)

module.exports = Comment