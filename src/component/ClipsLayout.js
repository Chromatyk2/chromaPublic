import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function Clips(props) {
    const [cookies, setCookie] = useCookies();
    const pseudo = cookies.user.data[0].login;
    return (
        <>
            <img style={{width: "35%"}} src={"images/logoSofk.png"}/>
        </>
    );
}

export default Clips;
