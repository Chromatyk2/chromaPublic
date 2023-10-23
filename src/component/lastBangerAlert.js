import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import $ from "jquery";

function LastBangerAlert(props) {
    const [lastCardData, setLastCardData] = useState(null);
    const [lastCardUser, setLastCardUser] = useState(null);
    const [newLastCardData, setNewLastCardData] = useState(null);
    const [newLastCardUser, setNewLastCardUser] = useState(null);
    const [newCard, setNewCard] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        Axios.get("/api/getLastCard/")
            .then(function(response){
                setLastCardUser(response.data[0])
                fetch("https://api.pokemontcg.io/v2/cards/"+response.data[0].card)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLastCardData(result);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            })
    }, []);
    useEffect(() => {
            setInterval(() => {
                Axios.get("/api/getLastCard/")
                    .then(function(response){
                        response.data.map((val, key) => {
                            if(val.stade == 4){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }else if(val.stade == 3){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }
                        })
                        setNewLastCardUser(response);
                    })
            }, 10000)
    }, []);
    useEffect(() => {
        if(newLastCardData != null){
            if(lastCardUser.user != newLastCardUser.user && lastCardUser.card != newLastCardUser.card){
                if(lastCardUser.stade == 3){
                    $('audio#pasmal')[0].play()
                }else if(lastCardUser.stade == 4){
                    $('audio#omglebanger')[0].play()
                }
                setLastCardUser(newLastCardUser);
                document.getElementById("lastBangerContainer").style.animation = "bounceLastBanger 9s forwards";
                setTimeout(() => {
                    setNewLastCardData(null);
                }, 9000);
            }
        }
    }, [newLastCardData])
    return (
        <>
            {newLastCardData &&
                <div id={"lastBangerContainer"} className={"lastBangerContainer"}>
                    <p className={"lastCardUsername"}>{newLastCardUser.data[0].user}</p>
                    <img style={{width:"450px"}} src={"https://images.pokemontcg.io/"+newLastCardData.data.set.id+"/"+newLastCardData.data.number+"_hires.png" }/>
                </div>
            }
            <audio id="pasmal">
                <source src="sounds/pasmal.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="omglebanger">
                <source src="sounds/omglebanger.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}
export default LastBangerAlert
