import React, { useState } from "react";
import QRCode from "qrcode";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const generateQRCode = async () => {
    if (!ssid) {
      alert("SSID is required to generate a QR code.");
      return;
    }

    // Construct the Wi-Fi QR code string
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:;`;

    try {
      // Generate the QR code data URL
      const dataUrl = await QRCode.toDataURL(wifiString);
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
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
