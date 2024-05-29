import React, {useEffect, useState} from 'react';
import '../App.css'
import {useParams} from "react-router-dom";
function SpawnPokemon(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [pokemon, setPokemon] = useState([]);
    const [name, setName] = useState([]);
    const [captures, setCaptures] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const { id } = useParams()
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/150")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setPokemon(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <>
            {isLoaded === true &&
                <>
                    <img className="imgPokemonPage" src={pokemon.sprites.other.home.front_default}></img>
                    <div className="pokeball"></div>
                </>
            }
        </>
    );
}

export default SpawnPokemon
