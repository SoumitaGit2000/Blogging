const user = require("../model/user");
const { tokenGenerator } = require("../authentication/auth")

async function handlerSingnup(req, res) {
  console.log("Signup is called");
  const { name, email, password } = req.body;
  try {
    const imagePath = req.file
      ? `/image/${req.file.filename}`
      : "/image/default.png";

    await user.create({
      name,
      email,
      password,
      profileImage: imagePath
    });

    console.log("Uploaded file:", req.file);
  } catch (error) {
    console.log("Error during signup:", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.redirect("login");
}


async function handlerLogin(req, res) {
    console.log("Login page called");
    const { email, password } = req.body;

    try {
        const userFound = await user.findOne({ email });

        if (!userFound) {
            return res.render('login', { error: "Invalid email or password" });
        }

        const isMatch = await userFound.matchPassword(password);

        if (!isMatch) {
            return res.render('login', { error: "Invalid email or password" });
        }
        const token = await tokenGenerator(userFound);
        console.log("Generated token:", token);
        return res.cookie("cookie", token).redirect("/blog/getblog");
    } catch (error) {
        console.error("Error during login:", error);
        return res.render('login', { error: "Something went wrong. Please try again." });
    }
}
// In your routes file
async function handlerLogout(req, res){
    res.clearCookie('cookie'); // Clear the auth cookie
    res.redirect('/login'); // Redirect to login page
};


module.exports = {handlerSingnup,handlerLogin,handlerLogout}