import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import ClipsPaginate from "./ClipsPaginate";
import UniqueStreamer from "./uniqueStreamer";

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
            <div className={"containerStream"}>
                <div className={"streamersList"}>
                    <p className={"streamTitle"}>Streameur.euses</p>
                    <hr style={{width: "50%", display: "block", margin: "auto", border: "1px solid #f7bb3e"}}/>
                    {orderedOnStream.length > 0 &&
                        onStream.map((val, key) => {
                            return (
                                <UniqueStreamer change={handleDataFromChild} onStream={true} streamer={val}/>
                            )
                        })
                    }
                    {offStream.length > 0 &&
                        offStream.map((val, key) => {
                            return (
                                <UniqueStreamer change={handleDataFromChild} onStream={false} streamer={val}/>
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
        </>
    );
}

export default ClipsLayout;
