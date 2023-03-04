import axios from "axios";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null)

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [logs, setLogs] = useState('logs');

    let Userid = '';
    const backendURL = "http://localhost:3312"
    const Pi = window.Pi;
    const scopes = ['username', 'payments'];
    let Userid4 = '';

    const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });
    const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } };
    
    
    const signin = async () => {

        //---------------------------------------------USED TO AUTHENTICATE THE USER-------------------------------------------------//

        const auth = await Pi?.authenticate(scopes, onIncompletePaymentFound)
            .then(function (auth) { return auth })
            .catch(function (error) {
                console.error(error)
            })
        
        //-------------------------------------------------GET USER ACCESS TOKEN-----------------------------------------------//

        const { accessToken: PioneerAccessToken, user: { uid } } = await auth;
        Userid4 = uid;
        const header = { headers: { authorization: "Bearer " + PioneerAccessToken } };
        const userDetails = await axios.get("https://api.minepi.com/v2/me", header);
        setUser(await userDetails.data.username);

        function onIncompletePaymentFound(payment) {
            console.log("onIncompletePaymentFound", payment);
            return axiosClient.post('/payments/incomplete', { payment });
        }
    }

    const payment = async () => {
        //---------------------------------------------------INITIATE PAYMENT---------------------------------------------//

        const paymentData = {
            amount: 1,
            memo: "Refund for apple pie",
            metadata: { productId: "apple-pie-1" },
            uid: Userid4
        }

        const callbacks = {
            onReadyForServerApproval,
            onReadyForServerCompletion,
            onCancel,
            onError
        };

        //-------------------------------------------------INITIATE USER PAYMENT------------------------------------------------//
        
        await Pi.createPayment(paymentData, callbacks); 
        
        
        //------------------------------------------PAYMENT PROCESS FUNCTIONS--------------------------------------------//
        
        
        async function onReadyForServerApproval(paymentId) {
            console.log("onReadyForServerApproval", paymentId);
            const res = await axiosClient.post('/payments/approve', { paymentId }, config);
            setLogs(res.data)
            console.log(res);
        }

        function onReadyForServerCompletion(paymentId, txid) {
            console.log("onReadyForServerCompletion", paymentId, txid);
            axiosClient.post('/payments/complete', { paymentId, txid }, config);
        }

        function onCancel(paymentId) {
            console.log("onCancel", paymentId);
            return axiosClient.post('/payments/cancelled_payment', { paymentId });
        }

        function onError(error, payment) {
            console.log("onError", error);
            if (payment) {
                console.log(payment);
            }
        }
    }
    return (
        <AuthContext.Provider value={{ user, signin, Userid, payment, logs }}>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider }