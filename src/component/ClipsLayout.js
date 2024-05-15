import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function ClipsLayout() {
    const [cookies, setCookie] = useCookies();
    const [team, setTeam] = useState([]);
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
            // response.data.data[0].users.map((val, key) => {
            //     Axios.get(
            //         'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
            //         {
            //             headers: {
            //                 'Authorization': `Bearer ${cookies.token.access_token}`,
            //                 'Client-Id': process.env.REACT_APP_CLIENT_ID
            //             }
            //         }
            //     ).then(function (response) {
            //         if (response.data.data.length > 0) {
            //             setOnStream(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
            //         } else if (response.data.data.length < 1) {
            //             setOffStream(oldArrayOff => [...oldArrayOff, val.user_name]);
            //         }
            //     })
            // })
        })
    }, [])
    return (
        <>
            <img style={{width: "35%"}} src={"images/logoSofk.png"}/>
        </>
    );
}

export default ClipsLayout;
