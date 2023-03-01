import { useAuth } from '../../contexts/AuthContext';
import style from "./UserAuth.module.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const UserAuth = () => {
    const { user, signin } = useAuth();
    const [display, setDisplay] = useState('none');
    const getUser = () => {
        setDisplay('block');
        signin();
    }
    
    return (
        <div className={`${style["homepage"]}`}>
            <img src="../assets/logo.png" alt="pipie logo" />
            <div>
                <Link to={`${user && "/payment"}`} className={`${style["signin"]}`} onClick={() => getUser()}>{ user ? "Proceed" : "Sign in" }</Link>
                <p className={`${style["username"]}`} style = {{display}}>{ user ? <>Signed in as: <b>{user}</b></> : `Loading...`}</p>
            </div>

        </div>
    )
}
