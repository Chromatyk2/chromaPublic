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
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/streams?user_login='+props.user_name,
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setStream(response.data);
        })
    }, [])
    console.log(stream);
    return (
        <>
            <div className="uniqueMyCardContainer">
                <p>{props.user_name}</p>
            </div>
        </>
    );
}

export default UniqueStreamer;
