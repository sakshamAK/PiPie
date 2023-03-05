import style from "./PaymentDetails.module.css"
import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"

export const PaymentDetails = () => {
  const { payment, sWallet, setSWallet } = useAuth()
  const [amt, setAmt] = useState(0);
  const [wlSeed, setWlSd] = useState(0);
  return (
    <div className={`${style["payments"]}`}>
      <h1 className={`${style["hi"]}`}>πi</h1>
      <div className={`${style["input-field"]}`}>
        <label htmlFor="WalletSeed">Pay to: </label>
        <input id="WalletSeed" onChange = {e => {setWlSd(e.target.value); setSWallet(e.target.value)}} type="text" placeholder="Pay to" value = {sWallet} />
      </div>
      <div className={`${style["input-field"]}`}>
        <label htmlFor="WalletSeed">Amount: </label>
        <input id="WalletSeed" onChange = {e => setAmt(e.target.value)} type="number" placeholder="0" />
      </div>
      <button onClick={() => payment(amt, wlSeed)} className={`${style["pay-pi"]}`}>Pay π</button>
    </div>
  )
}
