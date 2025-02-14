require("dotenv/config");
const express = require("express");
const connectDB = require("./config/mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Establishing database connection
connectDB();

const userRouter = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount point 
app.use("/api/users", userRouter);

// Handle all undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
