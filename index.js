const express = require("express");
const cors = require("cors");

//Added
const dotenv = require("dotenv");
dotenv.config();

// const { connection } = require("./config/db");
const { connectDB } = require("./config/db");
const { userModel } = require("./models/user.model");

// Added
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require("dotenv").config();
// app.use(express.json());
// app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// ***************************************************
app.get("/", (req, res) => {
  res.send("Wellcome to the Home Page");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  const userPresent = await userModel.findOne({ email });
  if (userPresent?.email) {
    res.send("Try loggin in, already exist");
  } else {
    try {
      const user = new userModel({ email, password, name });
      await user.save();
      res.send("Sign up successfull");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong, pls try again later");
    }
  }
});

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.find({ email });

//     if (user) {
//       res.status(201).send({ msg: "Login successfull" });
//     } else {
//       res.send("Login failed");
//     }
//   } catch {
//     res.send("Something went wrong, please try again later");
//   }
// });

// Added

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email is valid
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.status(200).json({ msg: "Login successful" });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
});
// ***************************************************

// app.listen(process.env.PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected to DB Successfully");
//   } catch (err) {
//     console.log("Error connecting to DB");
//     console.log(err);
//   }
//   console.log(`Listening on PORT ${process.env.PORT}`);
// });

// Added
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });





//   {
//     "email": "pablo@google.com",
//     "password": "Pablo@123",
//     "name": "Pablo Rolex"
//  }