import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';


function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authenticated, setauthenticated] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    /* //may be useful for on-page alerts rather than popup?
    useEffect(() => {
        const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);
    */

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);

    const signUp = () => {
        // console.log("signup")
        Axios.post("http://localhost:3331/signup", {
            email: email,
            username: username,
            password: SHA256(password).toString(),
        });
        navigate("/Login");
    }

    const validateFormInput = (event) => { //still need to check user
        event.preventDefault()

        //  Password Requirements
        //- Special character = 1, number = 1, lowercase = 1, uppercase = 1, minlength = 12

        const character = [];

        let specialChar = false;
        let number = false;
        let lowerCase = false;
        let upperCase = false;
        let minLength = false;
        let validPassword = false;

        if (password.length >= 12)
            minLength = true;
        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;

        for (let i = 0; i < password.length; i++) {
            if (password[i] === password[i].toLowerCase() && password[i] !== password[i].toUpperCase())
                lowerCase = true;
            if (password[i] === password[i].toUpperCase() && password[i] !== password[i].toLowerCase())
                upperCase = true;
            if (password[i] >= '0' && password[i] <= '9')
                number = true;
            if (specialCharacters.test(password[i]))
                specialChar = true;
        }


        if (specialChar == true && number == true && lowerCase == true && upperCase == true && minLength == true)
            validPassword = true

        if (validPassword == false) {
            // Append to failing conditions to the alert string
            // IDEALLY not an alert, but is a message on the page
            alert("Password is invalid:")
            /*if  (lowerCase == false)
                alert("Password must contain a lower case letter")
            if  (upperCase == false)
                alert("Password must contain an upper case letter/n")
            if  (number == false)
                alert("Password must contain a number/n")
            if  (specialChar == false)
                alert("Password must contain a special character/n")
            if  (minLength == false)
                alert("Password have at least 12 characters/n")
            */
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match");
        }
        else {
            Axios.post("http://localhost:3331/emailunused", {
                email: email
            }).then((response) => {
                // console.log(response.data)
                if (response.data[0]["COUNT(*)"] !== 0)
                    alert("Email already used")
                else
                    signUp();
            })
        }
    }

    if (authenticated === "true") { //cant access sign up page if logged in
        // console.log("auth")
        return <Navigate replace to="/NewCred" />; //maybe add page for no perms, or just redirect to 404
    }
    else {
        return <div className="FormatPage">
            <div className="SigningUp">
                <Link to="/Login">Already have an account? Log in</Link>
                <h1>Sign Up Below</h1>
                <form onSubmit={validateFormInput}>
                    <label>
                        Email Address
                        <input
                            required
                            type="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </label>
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
                            minLength="12"
                            maxLength="63"
                            required
                            type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        />
                    </label>
                    <label>
                        Re-enter Password
                        <input
                            minLength="12"
                            maxLength="63"
                            required
                            type="password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    }
}

export default SignUp;