import style from "./ScanQr.module.css"
import { QrReader } from 'react-qr-reader';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const ScanQr = () => {
  const { setSWallet } = useAuth();
  const navigate = useNavigate()
  return (
    <div className={`${style["scan-qr"]}`}>
      <h1 className={`${style["hi"]}`}>πi</h1>
      <div>
        <h2>Scan sender's address</h2>
        <QrReader
          scanDelay={1000}
          constraints={{
            facingMode: "environment"
          }}
          onResult={(result, error) => {
            if (result) {
              console.log(result?.text, "hello");
              setSWallet(result?.text)
              navigate("/details");
              result && console.log(result);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
      <h3><Link to="/details" style={{ color: "white" }}>Or enter details manually</Link></h3>
    </div>
  )
}


// import { QrReader } from "react-qr-reader";
// import { useState } from "react";
// export function ScanQr() {
//   const [qrScan, setQrScan] = useState(false);
//   const [cam, setCam] = useState("environment");
//   require('react-dom');
//   window.React2 = require('react');
//   console.log(window.React1 === window.React2);
//   return (
//     <div className="App">
//       {qrScan && (
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
//           console.log(error);
//         }}
//         style={{ width: "100%" }}
//       />
//       )}
//       <button onClick={() => setQrScan((prev) => !prev)}>Scan</button>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
