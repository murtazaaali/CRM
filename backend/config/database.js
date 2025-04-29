const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    // console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connect(
      "mongodb+srv://muhammadfaizanali876:Pistechs0340@cluster0.r1xhk4l.mongodb.net/sample_mflix"
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
