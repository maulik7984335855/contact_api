import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import {config} from 'dotenv'
import cors from 'cors'

import userRouter from "./routes/User.js";
import contactRouter from "./routes/Contact.js";

const app = express();
const port = 3000;
config({path:".env"})

app.use(bodyParser.json());
app.use(cors({
  origin:true,
  mathods:['POST',"GET","DELETE","PUT"],
  credentials:true
}))
//cors cross origin resource system

const contacts = [
  {
    id: 1,
    name: "Maulik",
    email: "maulik@gmail.com",
    phone: 1234567890,
  },
  {
    id: 2,
    name: "Ashvin",
    email: "ashvin@gmail.com",
    phone: 1234567890,
  },
  {
    id: 3,
    name: "Ankit",
    email: "ankit@gmail.com",
    phone: 1234567890,
  },
  {
    id: 4,
    name: "Shifa",
    email: "shifa@gmail.com",
    phone: 1234567890,
  },
  {
    id: 5,
    name: "Priya",
    email: "priya@gmail.com",
    phone: 1234567890,
  },
];

//connection
mongoose
  .connect(
   process.env.MongoUrl,
    {
      dbName: "Contact_Api",
    }
  )
  .then(() => {
    console.log("MongoDB Connected ");
  })
  .catch((err) => {
    console.log(err);
  });

//userRouter
app.use("/api/user", userRouter);

//contact router
app.use("/api/contact", contactRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
