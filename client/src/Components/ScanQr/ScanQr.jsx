import style from "./ScanQr.module.css"
import { QrReader } from 'react-qr-reader';
import { useState } from "react";
import { Link } from "react-router-dom";


export const ScanQr = () => {
  const [data, setData] = useState('');
  return (
    <div className={`${style["payments"]}`}>
      <h1 className={`${style["hi"]}`}>πi</h1>
      <div style={{ width: '100%', height: '50%', border: "15px solid white", backgroundColor: "black" }}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      </div>
      <p>{data}</p>
      <h3><Link to = "/details" style = {{color: "white"}}>Or enter details manually</Link></h3>
    </div>
  )
}
