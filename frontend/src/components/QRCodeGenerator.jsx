import React, { useState } from "react";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");

  const generateQRCode = async () => {
    console.log("Generate QR Code clicked");
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
    </div>
  );
};

export default QRCodeGenerator;
