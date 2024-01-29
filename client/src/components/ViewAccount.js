import React, {useEffect} from "react"
import Axios from "axios";
import {useLocation} from "react-router-dom";

function ViewAccount() {
    const location = useLocation();

    useEffect(() => { //test to view passwords table
        Axios.get("http://localhost:3331/getcred", {
            master_email: location.state.key
        }).then((response) => {
            // console.log(response.data);
        });
    }, []); //idk if this array should be changed

    return <div className="ViewingAccount">
    </div>
}

export default ViewAccount;