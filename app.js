require('dotenv').config();

const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000;


const cookieParser = require('cookie-parser')
const {checkCookie} = require('./middleware/auth_middleware')

//connections
const {connectmongoose} = require('./connections/connection')
// connectmongoose(process.env.MONGO_URL).then(() => console.log("Mongodb connected"))
connectmongoose(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// connectmongoose("mongodb://127.0.0.1:27017/Blog").then(() => console.log("Mongodb connected"))
//mongoose.connect("mongodb://127.0.0.1:27017/Blog").then(() => console.log("Mongodb connected"))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkCookie("cookie"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(express.static("public"))

app.use(async (req, res, next) => {
    const token = req.cookies?.cookie;
    if (token) {
        try {
            const userData = await getUser(token);
            res.locals.user = userData;
        } catch (err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
});



//view engine setting for ejs
app.set('view engine','ejs')
app.set("views", path.resolve("./views"))

//routes
const urlRoute = require('./route/user')
const blogRoute = require('./route/blog')
app.use('/',urlRoute)
app.use('/blog',blogRoute)

// app.get('/', (req,res)=>{
//     return res.render('home') 
// })

app.listen(PORT,()=>{console.log(`Server is running of ${PORT}`)})
