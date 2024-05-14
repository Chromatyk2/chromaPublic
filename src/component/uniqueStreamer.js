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

function UniqueStreamer(props, {setStreamToDisplay}) {
    const [cookies, setCookie] = useCookies();
    const pseudo = cookies.user.data[0].login;
    const [user, setUser] = useState(null);
    const [data, setData] = useState("");
    useEffect(() => {
        if(props.onStream === true){
            var streamerName = props.streamer.infos[0].user_name;
        }else{
            var streamerName = props.streamer;
        }
        Axios.get(
            'https://api.twitch.tv/helix/users?login='+streamerName,
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setUser(response.data);
        })
    }, [])
    function changeStream() {
        setData(document.getElementsByClassName('uniqueStreamerOnline')[0].value);
        setStreamToDisplay(data);
    }
    return (
        <>
            {user &&
                <>
                    <div onClick={changeStream} className="uniqueStreamer">
                        {props.onStream === true ?
                            <>
                                <button value={props.streamer.infos[0].user_name} onClick={changeStream} className={"uniqueStreamerOnline"}>
                                    <div className={"uniqueStreamerProfile"}>
                                        <img src={user.data[0].profile_image_url}/>
                                        <p>{props.streamer.infos[0].user_name}</p>
                                    </div>
                                    <div className={"uniqueStreamerStats"}>
                                        <img src={"/images/redCircle.png"}/>
                                        <p>{props.streamer.infos[0].viewer_count}</p>
                                    </div>
                                </button>
                            </>
                            :
                            <>
                                <button value={props.streamer} onClick={changeStream} className={"uniqueStreamerOnline"}>
                                    <div className={"uniqueStreamerProfile"}>
                                        <img style={{width: "50px",margin:"0"}} src={user.data[0].profile_image_url}/>
                                        <p>{props.streamer}</p>
                                    </div>
                                </button>
                            </>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default UniqueStreamer;
