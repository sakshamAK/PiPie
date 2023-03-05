require('dotenv').config();
const express = require("express");
const app = express();
const axios = require("axios")
const cors = require("cors")
const PORT = process.env.PORT || 3312;
const axiosClient = axios.create({ baseURL: "https://api.minepi.com", timeout: 20000 })
const API_KEY = process.env.API_KEY

const config = { headers: { 'Authorization': `Key ${API_KEY}`, 'Access-Control-Allow-Origin': '*' } };

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ["http://localhost:3314","https://pi-pie.vercel.app"],
    credentials: true
}));
console.log(process.env.API_KEY);

app.post('/payments/approve', async (req, res) => {
    try {
        const { uid } = await req.body
        const paymentId = req.body.paymentId.toString();
        
        const resFromPi = await axiosClient.post(`/v2/payments/${paymentId}/approve`, {}, config)
        res.send(resFromPi)
        console.log(resFromPi);
        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.post('/payments/complete', async (req, res) => {
    try {
        const paymentID = req.body.paymentId;
        const txid = req.body.txid;

        const resFromPi = await axiosClient.post(`/v2/payments/${paymentID}/complete`, {txid}, config)
        const myAddress = resFromPi.data.from_address
        return res.send(myAddress)

    } catch (error) {
        console.log(error)
    }
})

app.post('/payments/incomplete', async (req, res) => {
    try {
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


app.listen(PORT, () => console.log(`listening on port ${PORT}`))