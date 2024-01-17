const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const autheRoute = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/Movies");
const listRouter = require("./routes/lists");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// const corsOptions = {
//   origin: "http://localhost:3000/",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
//app.use(corsOptions());
const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL);
  console.log("Connected to MongoDB");
};
connectToMongo();
app.use("/api/user", userRouter);
app.use("/api/auth", autheRoute);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);
app.listen(3001, () => {
  console.log("the app is runing in port 3001");
});
