import React, {useEffect, useState} from 'react';
import '../App.css'
import {useParams} from "react-router-dom";
function SpawnPokemon(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+ Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemon(result);
                    if(Math.floor((Math.random() * 100) + 1) == 1){
                        setIsLoaded(false);
                        let root = document.querySelector(':root');
                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                    }else{
                        setIsLoaded(false);
                        let root = document.querySelector(':root');
                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                    }
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
                    <div className="pokemon">
                        <div className="pkmn exit left">
                            <div className="poke ball">
                                <span className="x">
                                  <span className="y">
                                    <span className="sprite">
                                    </span>
                                  </span>
                                </span>
                            </div>
                            <div className="mon"></div>
                            <div className="explode"></div>
                        </div>
                        <div className="pkmn exit right">
                            <div className="premier ball">
                                <span className="x">
                                  <span className="y">
                                    <span className="sprite">
                                    </span>
                                  </span>
                                </span>
                            </div>
                            <div className="mon"></div>
                            <div className="explode"></div>
                        </div>
                    </div>
                    <div style={{position: "absolute", left: "0", top: "0", right: "0", bottom: "0", margin: "auto"}}
                         className="pkmn exit left">
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
