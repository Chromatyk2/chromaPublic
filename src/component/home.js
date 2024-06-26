import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import '../App.css'

function HomePage(props) {
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState([]);
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
            response.data.data[0].users.map((val, key) => {
                Axios.get(
                    'https://api.twitch.tv/helix/users?login='+val.user_name,
                    {
                        headers:{
                            'Authorization': `Bearer ${cookies.token.access_token}`,
                            'Client-Id': process.env.REACT_APP_CLIENT_ID
                        }
                    }
                ).then(function(response){
                    setUser(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
                })
            })
        })
    }, [])
console.log(user);
  return (
    <>
        <div className={"contentContainer"}>
            <OnStream />
            <p style={{textAlign:"center",color:"white"}}>Bienvenue, {props.cookies.user.data[0].login}</p>
            <div className="socialContainer">
                <p className="myNetworks">Mes reseaux</p>
                <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i class="fa-brands fa-discord"></i>Discord</a>
                <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i class="fa-brands fa-twitch"></i>Twitch</a>
                <a className="socialLink" target='_blank' href="https://twitter.com/Chromatyk_"><i class="fa-brands fa-twitter"></i>Twitter</a>
                <a className="socialLink" target='_blank' href="https://www.instagram.com/chromatyk_/"><i class="fa-brands fa-instagram"></i>Instagram</a>
            </div>
        </div>
    </>
  )
}

export default HomePage
