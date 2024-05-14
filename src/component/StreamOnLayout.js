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
import UniqueStreamer from './uniqueStreamer.js';
import onStream from "./onStream";

function StreamOnLayout() {
    const [cookies, setCookie] = useCookies();
    const [loading, stLoading] = useCookies(true);
    const [count, setCount] = useState(0);
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [streams,setStreams] = useState([]);
    const [displayStream, setDisplayStream] = useState(true);
    const pseudo = cookies.user.data[0].login;
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setTeam(response.data.data[0].users);
            response.data.data[0].users.map((val, key) => {
                Axios.get(
                    'https://api.twitch.tv/helix/streams?user_login='+val.user_name,
                    {
                        headers:{
                            'Authorization': `Bearer ${cookies.token.access_token}`,
                            'Client-Id': process.env.REACT_APP_CLIENT_ID
                        }
                    }
                ).then(function(response){
                    if(response.data.data.length > 0){
                        setOnStream(oldArrayOn => [...oldArrayOn, {infos: response.data.data}] );
                    }else if(response.data.data.length < 1){
                        setOffStream(oldArrayOff => [...oldArrayOff,val.user_name] );
                    }
                })
            })
        })
    }, [])

    return (
        <div className={"containerStream"}>
            <div className={"streamersList"}>
                {onStream.length > 0 &&
                    onStream.map((val, key) => {
                        return (
                            <UniqueStreamer onStream={true} streamer={val}/>
                        )
                    })
                }
                {offStream.length > 0 &&
                    offStream.map((val, key) => {
                        return (
                            <UniqueStreamer onStream={false} streamer={val}/>
                        )
                    })
                }
            </div>
            <div className="twitch">
                <div className="twitch-video">
                    <iframe
                        src="https://player.twitch.tv/?channel=chromatyk&parent=preview--chromatyk.netlify.app&autoplay=true&muted=false"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen="true"
                        height="720"
                        width="1280">
                    </iframe>
                </div>
                <div className="twitch-chat">
                    <iframe
                        frameBorder="0"
                        scrolling="no"
                        src="https://www.twitch.tv/embed/chromatyk/chat?parent=preview--chromatyk.netlify.app"
                        height="100%"
                        width="100%">
                    </iframe>
                </div>
            </div>
        </div>
    );
}

export default StreamOnLayout;
