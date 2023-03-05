import axios from "axios";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null)

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [logs, setLogs] = useState('logs');
    const [sWallet, setSWallet] = useState("");

    let Userid = '';
    const backendURL = "54.254.162.138"
    const Pi = window.Pi;
    const scopes = ['username', 'payments', 'wallet_address'];
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
        console.log(userDetails);

        function onIncompletePaymentFound(payment) {
            console.log("onIncompletePaymentFound", payment);
            return axiosClient.post('/payments/incomplete', { payment });
        }
    }

    const payment = async (amt, walletSeed) => {
        //---------------------------------------------------INITIATE PAYMENT---------------------------------------------//

        const paymentData = {
            amount: amt,
            memo: "Paying to User",
            metadata: { walletSeed },
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

        async function onReadyForServerCompletion(paymentId, txid) {
            // console.log("onReadyForServerCompletion", paymentId, txid);
            const res = await axiosClient.post('/payments/complete', { paymentId, txid }, config);
            console.log("asdasdasdasdas", res.data);
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
        <AuthContext.Provider value={{ user, signin, Userid, payment, logs, setSWallet, sWallet }}>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider }