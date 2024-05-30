import React, {useEffect, useState} from 'react';
import '../App.css'
function SpawnPokemon(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [pokemon, setPokemon] = useState([])
    const [balls, setBalls] = useState(['poke','great','ultra','safari','premier','sport','net','dive','nest','repeat','timer','luxury','dusk','heal','quick','fast','level','lure','heavy','love','friend','moon','park','dream','beast']);
    const [useBall, setUseBall] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [reloadFetch, setReloadFetch] = useState(0);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    const isLegendary = Math.floor((Math.random() * 2) + 1);
                    const isMythical = Math.floor((Math.random() * 2) + 1);
                    const isShiny = Math.floor((Math.random() * 100) + 1);
                    switch (result.is_legendary){
                        case true:
                            switch (isLegendary){
                                case 1 :
                                    setUseBall("master")
                                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                let root = document.querySelector(':root');
                                                switch (isShiny){
                                                    case 1 :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                        break;
                                                    default :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                }
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                                    break;
                                default:
                                    console.log("Légendaire Refusé")
                                    setReloadFetch(reloadFetch + 1);
                            }
                            break;
                        default :
                            switch (result.is_mythical){
                                case true:
                                    switch (isMythical){
                                        case 1 :
                                            setUseBall("cherish")
                                            fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        let root = document.querySelector(':root');
                                                        switch (isShiny){
                                                            case 1 :
                                                                setIsLoaded(false);
                                                                root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                                break;
                                                            default :
                                                                setIsLoaded(false);
                                                                root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                        }
                                                    },
                                                    (error) => {
                                                        setIsLoaded(true);
                                                        setError(error);
                                                    }
                                                )
                                            break;
                                        default :
                                            console.log("Mythique non Autorisé !")
                                            setReloadFetch(reloadFetch + 1);
                                    }
                                    break;
                                default:
                                    setUseBall(balls[Math.floor(Math.random() * balls.length)])
                                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                let root = document.querySelector(':root');
                                                switch (isShiny){
                                                    case 1 :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                        break;
                                                    default :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                }
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                            }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [reloadFetch])
    return (
        <>
            {isLoaded === false &&
                <>
                    <div className="pokemonContent">
                        <div className="pkmn exit left">
                            <div className={useBall+" ball"}>
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
                            <div className={useBall+" ball"}>
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
                </>
            }
        </>
    );
}

export default SpawnPokemon
