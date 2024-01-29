import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import Axios from "axios";
import addmore from "../images/addmore.png";

function Dashboard() {
    const [passwords, setPasswords] = useState([]);
    const [change, setChange] = useState(false);
    const [authenticated, setauthenticated] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, [change]);

    useEffect(() => {
        Axios.post("http://localhost:3331/gettitles", {
            master_email: "bob@gmail.com", //need to pass real data
        }).then((response) => {
            // console.log(response.data);
            setPasswords(response.data);
        });
        }, []);

    if (authenticated === "false") { //localstorage is strings only
        // console.log("not auth")
        return <Navigate replace to="/Login" />;
    }
    else {
    return (
        <div className="FormatPage">
            <Link to="/Login">
                <span onClick={()=>{
                    localStorage.setItem("authenticated", false);
                    setChange((change) => !change);
                }}
                >Sign out</span>
            </Link>
            <h1>Dashboard</h1>
            <Link to="/NewCred">
                <img src={addmore} className="imageLink"  alt="add another credential"/>
            </Link>
            <div>
                <h2>View All Your Credentials</h2>
                {passwords.map((password) => (
                    <ul key={password["Title"]}>
                        <strong>{password["Title"]}</strong>
                        {/*<li >Username: {password.Title}</li>*/}
                        <li>
                            <Link to={`/view-entry/${password["Title"]}`}>
                                <button>View Details</button>
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}}

export default Dashboard;
