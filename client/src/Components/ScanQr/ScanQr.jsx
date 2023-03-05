// import style from "./ScanQr.module.css"
// import { QrReader } from 'react-qr-reader';
// import { useState } from "react";
// import { Link } from "react-router-dom";


// export const ScanQr = () => {
//   const [qrScan, setQrScan] = useState(false);
//   const [cam, setCam] = useState("environment");
//   console.log(window.React1 === window.React2);
//   return (
//     <div className={`${style["payments"]}`}>
//       <h1 className={`${style["hi"]}`}>πi</h1>
//       {/* {qrScan && ( */}
//       <QrReader
//         scanDelay={1000}
//         constraints={{
//           facingMode: cam
//         }}
//         onResult={(result, error) => {
//           if (result) {
//             console.log(result?.text, "hello");
//             window.location.href = result?.text;
//             result && console.log(result);
//           }
//         }}
//         style={{ width: "100%" }}
//       />
//       {/* )} */}
//       {/* <button onClick={() => setQrScan(true)}>Scan</button> */}
//       <h3><Link to="/details" style={{ color: "white" }}>Or enter details manually</Link></h3>
//     </div>
//   )
// }


import { QrReader } from "react-qr-reader";
import { useState } from "react";
export function ScanQr() {
  const [qrScan, setQrScan] = useState(false);
  const [cam, setCam] = useState("environment");
  require('react-dom');
  window.React2 = require('react');
  console.log(window.React1 === window.React2);
  return (
    <div className="App">
      {qrScan && (
      <QrReader
        scanDelay={1000}
        constraints={{
          facingMode: cam
        }}
        onResult={(result, error) => {
          if (result) {
            console.log(result?.text, "hello");
            window.location.href = result?.text;
            result && console.log(result);
          }
          console.log(error);
        }}
        style={{ width: "100%" }}
      />
      )}
      <button onClick={() => setQrScan((prev) => !prev)}>Scan</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
