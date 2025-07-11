const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

// async function connectmongoose (url) {
//     return mongoose.connect(url)
// }
async function connectmongoose(url) {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 20000 // 20 seconds
  });
}


module.exports = {
    connectmongoose
}