import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import ClipsPaginate from "./ClipsPaginate";
import UniqueStreamerClip from "./uniqueStreamerClip";
import UniqueStreamerMozaique from "./UniqueStreamerMozaique";

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
                    'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
                    {
                        headers: {
                            'Authorization': `Bearer ${cookies.token.access_token}`,
                            'Client-Id': process.env.REACT_APP_CLIENT_ID
                        }
                    }
                ).then(function (response) {
                    if (response.data.data.length > 0) {
                        setOnStream(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
                    } else if (response.data.data.length < 1) {
                        setOffStream(oldArrayOff => [...oldArrayOff, val.user_name]);
                    }
                })
            })
        })
    }, [])
    function handleDataFromChild(data) {
            Axios.get(
                'https://api.twitch.tv/helix/clips?first=100&broadcaster_id='+data,
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
    }
    return (
        <div className={"containerStream"}>
            <div className={"streamersList"}>
                <p className={"streamTitle"}>Streameur.euses</p>
                <hr style={{width: "50%", display: "block", margin: "auto", border: "1px solid #f7bb3e"}}/>
                {orderedOnStream.length > 0 &&
                    onStream.map((val, key) => {
                        return (
                            <UniqueStreamerClip change={handleDataFromChild} onStream={true} streamer={val}/>
                        )
                    })
                }
                {offStream.length > 0 &&
                    offStream.map((val, key) => {
                        return (
                            <UniqueStreamerClip change={handleDataFromChild} onStream={false} streamer={val}/>
                        )
                    })
                }
            </div>
            {clips.length > 0 &&
                <ClipsPaginate
                    itemsPerPage={32}
                    items={clips}
                />
            }
        </div>
    )
    return (
        <>
            {clips.length > 0 &&
                <ClipsPaginate
                    itemsPerPage={32}
                    items={clips}
                />
            }
        </>
    );
}

export default ClipsLayout;
