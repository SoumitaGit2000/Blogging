const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

async function connectmongoose (url) {
    return mongoose.connect(url)
}

module.exports = {
    connectmongoose
}