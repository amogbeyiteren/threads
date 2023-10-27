const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://mogbeyiterenabiloye123:RzFteJGt6Yvt96Hd@cluster0.2v7sche.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server running on the port 3000");
});

const User = require("./models/user");
const Post = require("./models/post");

app.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already Registered" });
    }
    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();

    // Check if email is valid before sending verification email
    if (!email || !email.includes("@")) {
      console.log("Invalid or undefined email");
      return res.status(400).json({ message: "Invalid email address" });
    }

    sendVerificationEmail(newUser.email, newUser.verificationToken); // Corrected typo "sendVerificationEmail"
    res.status(200).json({
      message:
        "Registration Successful. Please Check Your Mail For Verification Token",
    });
  } catch (error) {
    console.log("Error Registering User", error);
    res.status(500).json({ message: "Error Registering Users" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mogbeyiterenabiloye@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "threads.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email http://192.168.161.98:3000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending Email", error);
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token; // Corrected variable name from 'tokens' to 'token'
    const user = await User.findOne({ verificationToken: token }); // Corrected the query
    if (!user) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified Successfully" });
  } catch (error) {
    console.log("Error verifying token", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to perform login user authentication
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    if (user.password !== password) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//endpoint to fetch all users except the user logged in
app.get("/users/:userId", async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;
    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log("Error ", error);
        res.status(500).json("error");
      });
  } catch (error) {
    res.status(500).json({ message: "error getting the users" });
  }
});

//follow or unfollow users
app.post("/follow", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { followers: currentUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error in following a user" });
  }
});
app.post("/users/unfollow", async (req, res) => {
  const { loggedInUserId, targetUserId } = req.body;
  try {
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: loggedInUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error in unfollowing the user" });
  }
});

app.post("/create-post", async (req, res) => {
  try {
    const { content, userId } = req.body;
    const newPostData = {
      user: userId,
    };
    if (content) {
      newPostData.content = content;
    }
    const newPost = new Post(newPostData);
    await newPost.save();
    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Post Failed" });
  }
});

app.put("/post/:postId/:userId/like", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await Post.findById(postId).populate("user", "name");
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    if (!updatePost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    updatePost.user = post.user;
    res.json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred liking post" });
  }
});

app.put("/post/:postId/:userId/unlike", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await Post.findById(postId).populate("user", "name");
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
    if (!updatePost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    updatePost.user = post.user;
    res.json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred liking post" });
  }
});

app.get("/get-posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while getting posts" });
  }
});

app.get('/profile/:userId', async(req,res)=>{
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    return res.status(200).json({user});


  }
  catch(error){
    console.log("Error getting profile",error)
    res.status(500).json({message:'Error getting profile'})
  }
})