import style from "./PaymentDetails.module.css"
import QRCode from "react-qr-code"
import { useAuth } from "../../contexts/AuthContext"

export const PaymentDetails = () => {
    const { payment } = useAuth()
  return (
    <div className={`${style["payments"]}`}>
            <h1 className={`${style["hi"]}`}>πi</h1>
            <div className={`${style["input-field"]}`}>
                <label htmlFor="WalletSeed">Private Wallet Seed</label>
                <input id = "WalletSeed" type="text" placeholder="Private Wallet Seed" />
            </div>
            <button onClick={() => payment()} className={`${style["pay-pi"]}`}>Pay</button>
        </div>
  )
}
