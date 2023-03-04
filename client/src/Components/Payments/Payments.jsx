import style from "./Payments.module.css"
import QRCode from "react-qr-code"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

export const Payments = () => {
    const { payment, logs } = useAuth()
    return (
        <div className={`${style["payments"]}`}>
            <h1 className={`${style["hi"]}`}>πi</h1>
            <div>
                <QRCode size={256}
                    bgColor="#492975"
                    fgColor="#eeeeee"
                    viewBox={`0 0 256 256`}
                    value="SCKRGHMJIJCHS3ODDOH2O7MYGARVBUB5YBV3HPLC2BPAMZI6TIBKFNS4" />
                <h4 className={`${style["scan-qr"]}`}>Scan this QR to recieve payments</h4>
            </div>
            {/* <h1>{logs}</h1> */}
            {/* <button onClick={() => payment()} className={`${style["pay-pi"]}`}>Pay Using Pi</button> */}
            <Link to="/details" className={`${style["pay-pi"]}`}>Pay Using Pi</Link>
        </div>
    )
}
