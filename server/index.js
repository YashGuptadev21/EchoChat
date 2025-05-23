const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDb } = require("./utils/features");
const errorMiddleware = require("./middlewares/error");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const PORT = 3000;

//Loading Environment Variables
dotenv.config({
  path: "./.env",
});

//MongoDb connection
const mongoURI = process.env.MONGO_DB_URI;
connectDb(mongoURI);

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "U have Logged in",
  });
});

//Error Middleware
app.use(errorMiddleware);

//Server Up and Running
app.listen(PORT, () => {
  console.log("Server is running on " + `${PORT}`);
});
