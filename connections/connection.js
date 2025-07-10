const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

// async function connectmongoose (url) {
//     return mongoose.connect(url)
// }
async function connectmongoose (url) {
     return mongoose.connect(url)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
}
 

module.exports = {
    connectmongoose
}