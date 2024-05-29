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
        fetch("https://pokeapi.co/api/v2/pokemon/"+ Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setPokemon(result);
                    let root = document.querySelector(':root');
                    root.style.setProperty('--backGgroundImage', 'url('+result.sprites.other.home.front_default+')');
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const customStyles = {
        '.mon':{
            '&::before': {
                backgroundImage : 'url("https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif")'
            }
        }
    }
    return (
        <>
            {isLoaded === false &&
                <>
                    <div style={{position:"absolute",left:"50%",right:"50%",transform:"translate(-50%,-50%)"}} className="pkmn exit left">
                        <div className="poke ball">
                            <span className="x">
                              <span className="y">
                                <span className="sprite">
                                </span>
                              </span>
                            </span>
                        </div>
                        <div style={customStyles} className="mon"></div>
                        <div className="explode"></div>
                    </div>
                </>
            }
        </>
    );
}

export default SpawnPokemon
