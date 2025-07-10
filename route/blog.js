const {Router} = require('express');
const route = Router();
const multer = require('multer')
const path = require('path');
const Blog = require('../model/blog_schema');
const comment = require("../model/comment")
// const {createdBy} = require('../model/user');

//storage configuration of multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({storage})


route.get("/getblog", async (req, res) => {
  try {
    const allBlogs = await Blog.find({})

    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
  } catch (err) {
    console.error("Error loading homepage:", err);
    return res.render("home", {
      user: req.user || null,
      blogs: []
    });
  }
});

route.get("/addblog", (req, res) => {
  return res.render("addBlogs")
})  

route.post("/addblog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/getblog`);
});

route.get("/:id", async (req,res) =>{
  console.log("inside id route")
  const blog = await Blog.findById(req.params.id).populate("createdBy")
  const comments = await comment.find({ blogId: req.params.id })
  .populate("createdBy", "profileImage");
  // console.log(blog)
  console.log("comments : ",comments)
  return res.render("blog",{
    user : req.user,
    blog,
    comments
  })
})

route.post("/comment/:id", async (req, res)=>{
  console.log("inside comment id route")
  await comment.create({
    content: req.body.content,
    blogId: req.params.id,
    createdBy: req.user._id
  })
  // return res.render("blog")
  // return res.redirect(`/blog/${Blog.blogId}`)
  return res.redirect(`/blog/${req.params.id}`);

})

module.exports = route;