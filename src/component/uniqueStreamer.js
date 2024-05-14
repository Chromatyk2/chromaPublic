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
    console.log(props);
    return (
        <>
            <div className="uniqueStreamer">
                {props.onStream === true ?
                    <div className={"uniqueStreamerOnline"}>
                            <p>{props.streamer.infos[0].user_name}</p>
                            <img style={{width:"15px"}} src={"/images/redCircle.png"}/>
                            <p>{props.streamer.infos[0].viewer_count}</p>
                    </div>
                    :
                    <p>{props.streamer}</p>
                }
            </div>
        </>
    );
}

export default UniqueStreamer;
