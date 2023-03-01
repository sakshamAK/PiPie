import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export const UserAuth = () => {
    const { user, signin, payment } = useAuth();

    // const signin = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:3312/", {ASD:"asdasd"})
    //         console.log(res);
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <>
            <div>@{user}</div>
            <button onClick={() => signin()}>signin</button>
            <button onClick={() => payment()}>payment</button>
        </>
    )
}
