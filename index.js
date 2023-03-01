// const PiNetwork = require('pi-backend')
const express = require("express");
const app = express();
const axios = require("axios")
const cors = require("cors")
const PORT = 3312;
const apiKey = "30z0czy0p0ws7ubs45bqlzjvvqnwqik29sgigsmdainoqavr5ye6al3eq2s62uta"
const walletPrivateSeed = "SCKRGHMJIJCHS3ODDOH2O7MYGARVBUB5YBV3HPLC2BPAMZI6TIBKFNS4" // starts with S
// const pi = new PiNetwork.default(apiKey, walletPrivateSeed);

const axiosClient = axios.create({ baseURL: "https://api.minepi.com", timeout: 20000 })
const config = { headers: { 'Authorization': `Key ${apiKey}`, 'Access-Control-Allow-Origin': '*' } };

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "http://localhost:3314",
    credentials: true
}));

app.post('/payments/approve', async (req, res) => {
    try {
        const { uid } = await req.body
        const paymentId = req.body.paymentId.toString();
        
        const resFromPi = await axiosClient.post(`/v2/payments/${paymentId}/approve`, {}, config)
        console.log(resFromPi);
        
    } catch (error) {
        console.log(error)
        // console.log(`/v2/payments/${paymentId}/approve`);
        // console.log("Payment IDDDD", paymentId);
    }
})

app.post('/payments/complete', async (req, res) => {
    try {
        // const { uid } = await req.body
        const paymentID = req.body.paymentId;
        const txid = req.body.txid;
        console.log(paymentID);

        const resFromPi = await axiosClient.post(`/v2/payments/${paymentID}/complete`, {txid}, config)
        console.log(paymentID, txid);
        console.log(resFromPi);

    } catch (error) {
        console.log(error)
    }
})

app.post('/payments/incomplete', async (req, res) => {
    try {
        // const { uid } = await req.body
        const payment = req.body.payment;
        const { identifier: paymentId } = payment;
        const txid = payment.transaction && payment.transaction.txid;
        console.log(paymentId);

        const resFromPi = await axiosClient.post(`/v2/payments/${paymentId}/complete`, {txid}, config)
        console.log(resFromPi);

    } catch (error) {
        console.log(error)
    }
})

app.post('/submitpayment', async (req, res) => {
    try {
        // const { uid } = await req.body
        const paymentId = req.body.paymentID;
        // const txid = payment.transaction && payment.transaction.txid;
        console.log(paymentId);
        // const txid = await pi.submitPayment(paymentId);
        // console.log("txidDdddd:", txid);

        const resFromPi = await axiosClient.post(`/v2/payments/${paymentID}/complete`, {txid}, config)
        console.log(resFromPi);

    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))