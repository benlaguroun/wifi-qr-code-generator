import React, { useState } from "react";
import QRCode from "qrcode";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  // Function to generate QR code
  const generateQRCode = async () => {
    if (!ssid.trim()) {
      alert("SSID is required to generate a QR code.");
      return;
    }

    if (encryption !== "" && password.length < 8) {
      alert("Password must be at least 8 characters for secure encryption.");
      return;
    }

    // Wi-Fi QR Code String
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:;`;

    try {
      const dataUrl = await QRCode.toDataURL(wifiString); // Generate QR Code
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR Code: ", error);
    }
  };

  return (
    <div className="qr-generator-container">
      <h1 className="title">Wi-Fi QR Code Generator</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Wi-Fi SSID"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Enter Wi-Fi Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="select"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="">None</option>
        </select>
        <button onClick={generateQRCode} className="generate-btn">
          Generate QR Code
        </button>
      </div>

      {/* Display the generated QR Code */}
      {qrCodeDataUrl && (
        <div className="qr-code-display">
          <h2>Your Wi-Fi QR Code:</h2>
          <img src={qrCodeDataUrl} alt="Generated QR Code" />
          <a
            href={qrCodeDataUrl}
            download="wifi-qr-code.png"
            className="download-btn"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
