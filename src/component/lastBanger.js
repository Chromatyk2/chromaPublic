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
                            setNewLastCardUser(response.data[0])
                            fetch("https://api.pokemontcg.io/v2/cards/"+response.data[0].card)
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
                    })
            }, 10000)
    }, []);
    useEffect(() => {
        if(newLastCardData != null){
            document.getElementById("lasBangerContainer").style.display = "none";
            document.getElementById("lasBangerContainer").style.display = "block";
        }
    }, [newLastCardData])
    return (
        <>
            {newLastCardData &&
                <div id={"lastBangerContainer"} className={"lastBangerContainer"}>
                    <p className={"lastCardUsername"}>{lastCardUser.user}</p>
                    <img style={{width:"450px"}} src={"https://images.pokemontcg.io/"+lastCardData.data.set.id+"/"+lastCardData.data.number+"_hires.png" }/>
                </div>
            }
        </>
    )
}
export default LastBanger
