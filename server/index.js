const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

// db connection
const uri = process.env.MONOGDB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/generateqr", (req, res) => {
  try {
    var opts = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#010599FF",
        light: "#FFBF60FF",
      },
    };

    QRCode.toDataURL("text", opts, function (err, url) {
      if (err) throw err;
      console.log(url);
      res.json({ url });
    });
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw new Error("Failed to generate QR code");
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
