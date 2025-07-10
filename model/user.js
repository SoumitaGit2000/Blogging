const { Schema, model } = require("mongoose")
const { tokenGenerator } = require("../authentication/auth")
const userSchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    profileImage:{
        type:String,
        default: "/uploads/default.jpeg"
    }
},
{timestamps: true}) // createdAt and updatedAt fields

//Password Hashing or Encryption
//const bcrypt = require("bcrypt");
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     console.log("Saving user:", this.email);
//     const user = await this.findone(email)
//     const salt = await bcrypt.genSalt(10);
//     this.salt = salt
//     this.password = await bcrypt.hash(this.password, salt);
//     // const token = tokenGenerator(user)
//     // console.log("Generated token:", token)
//     console.log(this.salt, this.password)
//     next();
// });
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.salt = salt;
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});


//Dehashing or Decryption
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// const { randomBytes, createHmac } = require("crypto");
// userSchema.pre("save", function(next) {
//     const user = this;
//     if(!user.isModified("password")) return null;

//     const salt = randomBytes(16).toString(); // Generate random value with 16 digits converted into string
//     const secret = 'abcd1234'
//     const hashPassword = createHmac("sha256", salt).update(user.password).digest("hex")
//     this.salt = salt;
//     this.password = hashPassword
//     console.log(hash, salt)
//     next();
// })




// userSchema.virtual("matchPassword", function(email, password){
//     const find = this.findOne({ email })
//     if(!find) return false;

//     const userPassword = password
//     const salt = this.salt
    
//     const hashPassword = createHmac("sha256", salt).update(userPassword).digest("hex")
//     if (hashPassword !== find.password)throw new Error("Invalid credentials");
//     return {...user, password:undefined, salt: undefined}
// })





const User = model("user", userSchema)
module.exports = User