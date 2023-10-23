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
    return (
        <>
            {lastCard &&
                <>
                    <p className={"lastCardUsername"}>{lastCardUser.user}</p>
                    <img src={"https://images.pokemontcg.io/"+setLastCardData.data.set.id+"/"+setLastCardData.data.number+"_hires.png" }/>
                </>
            }
        </>
    )
}
export default LastBanger
