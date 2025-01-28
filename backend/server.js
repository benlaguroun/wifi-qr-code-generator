const express = require("express");
const QRCode = require("qrcode");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// API to generate and save QR Code
app.post("/generate-qrcode", async (req, res) => {
  const { ssid, password, encryption } = req.body;
  const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};H:false;`;
  const filePath = path.join(__dirname, "qrcodes", "wifi-qrcode.png");

  try {
    await QRCode.toFile(filePath, qrData);
    res.send({ message: "QR Code generated", filePath });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate QR Code" });
  }
});

// Serve the QR code image
app.get("/qrcode", (req, res) => {
  const filePath = path.join(__dirname, "qrcodes", "wifi-qrcode.png");
  res.sendFile(filePath);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

