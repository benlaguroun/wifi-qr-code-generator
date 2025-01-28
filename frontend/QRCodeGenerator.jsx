import React, { useState } from "react";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";

const QRCodeGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [qrCodeData, setQrCodeData] = useState("");

  const generateQRCode = async () => {
    const response = await fetch("http://localhost:5000/generate-qrcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssid, password, encryption }),
    });
    const data = await response.json();
    if (data.filePath) {
      setQrCodeData(`http://localhost:5000/qrcode`);
    }
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
      <select value={encryption} onChange={(e) => setEncryption(e.target.value)}>
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="">None</option>
      </select>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeData && (
        <div>
          <img src={qrCodeData} alt="Wi-Fi QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;

