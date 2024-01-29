import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";

function NewCreds () {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); //initally "", use setPassword to trigger updated current password
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [change, setChange] = useState(false);
    const [authenticated, setauthenticated] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, [change]);

    /*useEffect(() => { //test to view passwords table
        Axios.get("http://localhost:3331/getpassword").then((response) => {
            // console.log(response.data);
        });
    }, []);*/

    useEffect(() => { //view all items in localstorage
        var i;
        // console.log("local storage");
        for (i = 0; i < localStorage.length; i++)   {
            // console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }
    }, []);

    const addCred = () => {
        Axios.post("http://localhost:3331/addcred", {
            master_email: location.state.key, //passed master email from login
            title: title,
            username: username,
            password: password,
            email: email,
            url: url,
            notes: notes,
        });
    };

    const gotodashboard = (event) => {
        event.preventDefault()
        // console.log("go to dashboard...")
        navigate("/Dashboard");
    }

    if (authenticated === "false") { //localstorage is strings only
        // console.log("not auth")
        return <Navigate replace to="/Login" />;
    }
    else {
        return <div className="FormatPage">
        <div className="AddingCred">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/Login">
                <span onClick={()=>{
                    localStorage.setItem("authenticated", false);
                    setChange((change) => !change);
                }}
                >Sign out</span>
            </Link>
            <Link>
                <span onClick={gotodashboard}
                >Dashboard</span>
            </Link>
        </div>
            <h1>Add Another Credential</h1>
            <form onSubmit={addCred}>
            <label>
                Title
                <input
                    required
                    type="text"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
            </label>
            <label>
                Username
                <input
                    type="text"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value); //get input that triggered event (basically anything bc onChange)
                    }}
                />
            </label>
            <label>
                Email
                <input
                    type="text"
                    onChange={(event) => {
                        setEmail(event.target.value); //get input that triggered event (basically anything bc onChange)
                    }}
                />
            </label>
            <label>
                URL
                <input
                    type="text"
                    onChange={(event) => {
                        setUrl(event.target.value);
                    }}
                />
            </label>
            <label>
                Notes
                <input
                    type="text"
                    onChange={(event) => {
                        setNotes(event.target.value);
                    }}
                />
            </label>
                <input type="submit" value="Add Credential" />
            </form>
        </div>
        </div>
    }
}
export default NewCreds;