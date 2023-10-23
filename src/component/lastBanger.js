import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function LastBanger(props) {
    const [lastCardData, setLastCardData] = useState(null);
    const [lastCardUser, setLastCardUser] = useState(null);
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
        const intervalId = setInterval(() => {
            document.getElementById("lastBangerContainer").classList.toggle("lastBangerContainer");
            document.getElementById("lastBangerContainer").classList.toggle("lastBangerContainerBounceOut");
        }, 9000)
    }, [])
    useEffect(() => {
        if(lastCardUser != null){
            const intervalId = setInterval(() => {
                Axios.get("/api/getLastCard/")
                    .then(function(response){
                        console.log(lastCardUser);
                        console.log(response.data[0].user);
                        console.log(lastCardUser.card);
                        console.log(response.data[0].card);

                        if(lastCardUser.user != response.data[0].user && lastCardUser.card != response.data[0].card){
                            setLastCardUser(response.data[0])
                            fetch("https://api.pokemontcg.io/v2/cards/"+response.data[0].card)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setLastCardData(result);
                                        document.getElementById("lastBangerContainer").classList.toggle("lastBangerContainerBounceOut");
                                        document.getElementById("lastBangerContainer").classList.toggle("lastBangerContainer");
                                    },
                                    (error) => {
                                        setIsLoaded(true);
                                        setError(error);
                                    }
                                )
                        }
                    })
            }, 10000)
        }
    }, [])
    return (
        <>
            {lastCardData &&
                <div id={"lastBangerContainer"} className={"lastBangerContainer"}>
                    <p className={"lastCardUsername"}>{lastCardUser.user}</p>
                    <img style={{width:"450px"}} src={"https://images.pokemontcg.io/"+lastCardData.data.set.id+"/"+lastCardData.data.number+"_hires.png" }/>
                </div>
            }
        </>
    )
}
export default LastBanger
