import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function LastBanger(props) {
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
                            if(val.filter(item => item.rarity == "Hyper Rare" || item.rarity == "Illustration Rare" || item.rarity == "LEGEND" || item.rarity == "Rare Holo" || item.rarity == "Rare Holo Star" || item.rarity == "Rare Rainbow" || item.rarity == "Rare Secret" || item.rarity == "Rare Ultra" || item.rarity == "Special Illustration Rare" || item.rarity == "Trainer Gallery Rare Holo")){
                                setLastCardUser(val)
                                setNewLastCardUser(val)
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setLastCardData(result);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }else if(val.filter(item => item.rarity == " Rare Holo GX" || item.rarity == "Amazing Rare" || item.rarity == "Double Rare" || item.rarity == "Radiant Rare" || item.rarity == "Rare Holo Star" || item.rarity == "Rare Rainbow" || item.rarity == "Rare Secret" || item.rarity == "Rare Ultra" || item.rarity == "Special Illustration Rare" || item.rarity == "Trainer Gallery Rare Holo")){
                                setLastCardUser(val)
                                setNewLastCardUser(val)
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setLastCardData(result);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }
                        })
                    })
            }, 10000)
    }, []);
    useEffect(() => {
        if(newLastCardData != null){
            if(lastCardUser.user != newLastCardUser.user && lastCardUser.card != newLastCardUser.card){
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
                    <p className={"lastCardUsername"}>{newLastCardUser.user}</p>
                    <img style={{width:"450px"}} src={"https://images.pokemontcg.io/"+newLastCardData.data.set.id+"/"+newLastCardData.data.number+"_hires.png" }/>
                </div>
            }
        </>
    )
}
export default LastBanger
