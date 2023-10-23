import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function LastBanger(props) {
    const [lastCard, setLastCard] = useState(null);
    const [newCard, setNewCard] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        Axios.get("/api/getLastCard/")
            .then(function(response){
                console.log(response);
                fetch("https://api.pokemontcg.io/v2/cards/"+response.card)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLastCard(result);
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
                    <img src={"https://images.pokemontcg.io/"+lastCard.data.set.id+"/"+lastCard.data.number+"_hires.png" }/>
                </>
            }
        </>
    )
}
export default LastBanger
