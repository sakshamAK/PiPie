import style from "./ScanQr.module.css"
import { useAuth } from "../../contexts/AuthContext"
import { QrReader } from 'react-qr-reader';
import { useState } from "react";


export const ScanQr = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = (err) => {
    console.error(err);
  }
  return (
    <div className={`${style["payments"]}`}>
      <h1 className={`${style["hi"]}`}>hello</h1>
      <div style={{ width: '100%', height: '100%', border: "15px solid white", backgroundColor: "black" }}>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
      </div>
      <p>{result}</p>
    </div>
  )
}
