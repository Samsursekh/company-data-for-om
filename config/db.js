// const mongoose = require("mongoose");
// require("dotenv").config();
// mongoose.set("strictQuery", false);
// const connection = mongoose.connect(process.env.mongo_url);
// module.exports = { connection };


// Added
const mongoose = require("mongoose");
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(uri, options);
    console.log("Connected to the dataBase");
  } catch (error) {
    console.error("Error while Connecting");
    throw error;
  }
};
module.exports = { connectDB };
