import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function ClipsLayout() {
    const [cookies, setCookie] = useCookies();
    const [team, setTeam] = useState([]);
    const [clips, setClips] = useState([]);
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function (response) {
            setTeam(response.data.data[0].users);
            response.data.data[0].users.map((val, key) => {
                Axios.get(
                    'https://api.twitch.tv/helix/clips?first=100&broadcaster_id='+val.user_id,
                    {
                        headers: {
                            'Authorization': `Bearer ${cookies.token.access_token}`,
                            'Client-Id': process.env.REACT_APP_CLIENT_ID
                        }
                    }
                ).then(function (response) {
                    response.data.data.map((val, key) => {
                        setClips(oldArrayOn => [...oldArrayOn, val]);
                    })
                })
            })
        })
    }, [])

    return (
        <>
            {clips.length > 0 &&
                clips.map((val, key) => {
                    return (
                        <a href={val.url}>
                            <img style={{width: "35%"}} src={val.thumbnail_url}/>
                        </a>
                    )
                })
            }
        </>
    );
}

export default ClipsLayout;
