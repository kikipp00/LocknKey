import {Link, Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'
import Axios from "axios";

function Entry () {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [change, setChange] = useState(false);
    const [buttonText, setButtonText] = useState("Reveal Password");
    const [authenticated, setauthenticated] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, [change]);

    useEffect(() => {
        Axios.post("http://localhost:3331/getinfo_nopass", {
            master_email: "bob@gmail.com", //need to pass real data
            title: id,
        }).then((response) => {
            // console.log(response.data);
            setTitle(id);
            Axios.post("http://localhost:3331/decrypttext", {
                text: response.data[0]["username"],
                iv: response.data[0]["username_iv"]
            }).then((response) => {
                setUsername(response.data);
            })
            Axios.post("http://localhost:3331/decrypttext", {
                text: response.data[0]["email"],
                iv: response.data[0]["email_iv"]
            }).then((response) => {
                setEmail(response.data);
            })
            Axios.post("http://localhost:3331/decrypttext", {
                text: response.data[0]["url"],
                iv: response.data[0]["url_iv"]
            }).then((response) => {
                setUrl(response.data);
            })
            Axios.post("http://localhost:3331/decrypttext", {
                text: response.data[0]["notes"],
                iv: response.data[0]["notes_iv"]
            }).then((response) => {
                setNotes(response.data);
            })
        });
    }, []);

    useEffect(() => {
        // console.log("password " + password);
    }, [password]);

    const gotodashboard = (event) => {
        event.preventDefault()
        // console.log("go to dashboard...")
        navigate("/Dashboard");
    }

    const triggerpass = (event) => {
        event.preventDefault()
        if(buttonText === "Reveal Password") {
            Axios.post("http://localhost:3331/getpass", {
                master_email: "bob@gmail.com", //need to pass real data
                title: id,
            }).then((response) => {
                Axios.post("http://localhost:3331/decrypttext", {
                    text: response.data[0]["password"],
                    iv: response.data[0]["password_iv"]
                }).then((response) => {
                    setButtonText(response.data)
                    setPassword(response.data);
                })
            });
        }
        else {
            setPassword("")
            setButtonText("Reveal Password")
        }
    }

    if (authenticated === "false") { //localstorage is strings only
        // console.log("not auth")
        return <Navigate replace to="/Login" />;
    }
    else {
        return <div className="FormatPage">
            <div className="ViewEntry">
                <Link>
                <span onClick={gotodashboard}
                >Dashboard</span>
                </Link>
                <h1>{ title }</h1>
                <label>
                    Username
                    <input
                        type="text"
                        value={ username }
                        readOnly
                    />
                </label>
                Password
                <button onClick={triggerpass}>{buttonText}</button>
                <label>
                    Email
                    <input
                        type="text"
                        value={ email }
                        readOnly
                    />
                </label>
                <label>
                    URL
                    <input
                        type="text"
                        value={ url }
                        readOnly
                    />
                </label>
                <label>
                    Notes
                    <input
                        type="text"
                        value={ notes }
                        readOnly
                    />
                </label>
            </div>
        </div>
    }
}

export default Entry;