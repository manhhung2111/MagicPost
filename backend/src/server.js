import mongoose from "mongoose";
import express from "express";
require("dotenv").config();
import cors from "cors";


const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  // credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const port = process.env.PORT || 8081;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// get data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data


(async function () {
  try {
    //connect to database
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@backend.oyub5h4.mongodb.net/${dbName}`
    );

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();