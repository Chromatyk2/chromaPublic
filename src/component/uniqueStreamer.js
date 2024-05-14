import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import {useCookies} from "react-cookie";

function UniqueStreamer(props) {
    const [cookies, setCookie] = useCookies();
    const pseudo = cookies.user.data[0].login;
    const [stream, setStream] = useState(null);
    if(props.onStream === true){
        const [pseudoStreamer, setPse] = useState(props.streamer.user_name);
    }else{
        const [pseudoStreamer, setPse] = useState(props.streamer);
    }
    console.log(props);
    return (
        <>
            <div className="uniqueStreamer">
                {props.onStream === true ?
                    <p>{props.streamer.user_name}</p>
                    :
                    <p>{props.streamer}</p>
                }
            </div>
        </>
    );
}

export default UniqueStreamer;
