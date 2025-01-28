import React, { useState } from "react";

const QRCodeGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");

  const generateQRCode = async () => {
    console.log("Generate QR Code clicked");
    // Add logic to generate QR code or communicate with backend here
  };

  return (
    <div>
      <h1>Wi-Fi QR Code Generator</h1>
      <input
        type="text"
        placeholder="SSID"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        value={encryption}
        onChange={(e) => setEncryption(e.target.value)}
      >
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="">None</option>
      </select>
      <button onClick={generateQRCode}>Generate QR Code</button>
    </div>
  );
};

export default QRCodeGenerator; // Make sure this is a default export
