const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Terhubung ke API" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terkoneksi dengan MongoDB");
    app.listen(3000, () => {
      console.log("Server sedang berjalan di port 3000");
    });
  })
  .catch((e) => {
    console.log(`Gagal terkoneksi dengan MongoDB, ${e}`);
  });
