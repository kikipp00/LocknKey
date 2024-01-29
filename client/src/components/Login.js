import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { SHA256 } from 'crypto-js';

function Login (){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);

    const login = (event) => {
        event.preventDefault()
        Axios.post("http://localhost:3331/login", {
            username: username,
            password: SHA256(password).toString(),
        }).then((response) => {
            // console.log(response.data)
            if(response.data.length === 0)
                alert("Account not found")
            else {
                localStorage.setItem("authenticated", true);
                navigate("/NewCred", {state:{key:response.data[0]["Email"]}});
            }
        });
    };

    if (authenticated === "true") { //cant access sign up page if logged in
        // console.log("auth")
        return <Navigate replace to="/NewCred" />; //maybe add page for no perms, or just redirect to 404
    }
    else {
        return <div className="FormatPage">
            <div className="LoggingIn">
                <h1>LocknKey</h1>
                <form onSubmit={login}>
                    <label>
                        Username
                        <input
                            required
                            type="text"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            required
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </label>
                    <input type="submit" value="Log In"/>
                </form>
                <Link to="/SignUp">Don't have an account? Register Now</Link> {/*needs centering*/}
            </div>
        </div>
    }
}

export default Login;