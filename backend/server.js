const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const products = require("./data/products");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
require("colors");
const { errorHandle } = require("./middlewares/errorMiddleware");
const orderRoutes = require("./routes/orderRoute");

//.env file config
dotenv.config();
// connecting to database
connectDB();

const app = express();
// middleware bodyparser
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Running Successfull");
});

app.use("/api", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandle);

PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server is running on Port http://localhost:${process.env.PORT}`.inverse
  );
});
