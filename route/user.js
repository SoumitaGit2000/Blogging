const { Router } = require('express')
const route = Router()
const multer = require('multer')
const path = require('path');
const Blog = require("../model/blog_schema")
const {handlerSingnup, handlerLogin,handlerLogout}= require('../controller/user')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../image'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload2 = multer({storage})


route.get('/signup', (req, res)=>{
    return res.render('signup')
})
route.get('/login',(req, res)=>{
    return res.render('login')
})

route.post('/signup',upload2.single("profileImage"), handlerSingnup)
route.post('/login', handlerLogin)

route.get('/', async (req,res)=>{
  try{
    const blogs = await Blog.find();
    return res.render('home',{
        // user: req.user,
        blogs
    }) 
  }
  catch{
    console.error(err)
    res.status(500).send("Server error")
  }
    
})
route.get('/logout',handlerLogout)


module.exports = route