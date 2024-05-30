import React, {useEffect, useState} from 'react';
import '../App.css'
function SpawnPokemon(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [pokemon, setPokemon] = useState([])
    const [balls, setBalls] = useState(['poke','great','ultra','safari','premier','sport','net','dive','nest','repeat','timer','luxury','dusk','heal','quick','fast','level','lure','heavy','love','friend','moon','park','dream','beast','cherish','master']);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    const isLegendary = Math.floor((Math.random() * 1) + 1);
                    switch (result.is_legendary){
                        case true:
                            switch (isLegendary){
                                case 1 :
                                    console.log("Légendaire Autorisé");
                                    break;
                                default:
                                    console.log("Légendaire Refusé")
                            }
                            console.log("légendaire");
                            break;
                        default :
                            console.log("pas légendaire")
                    }
                    // setPokemon(result);
                    // fetch("https://pokeapi.co/api/v2/pokemon-species/"+idPkm)
                    //     .then(res => res.json())
                    //     .then(
                    //         (result) => {
                    //             if(Math.floor((Math.random() * 100) + 1) == 1){
                    //
                    //             }
                    //             if(Math.floor((Math.random() * 100) + 1) == 1){
                    //                 setIsLoaded(false);
                    //                 let root = document.querySelector(':root');
                    //                 root.style.setProperty('--backGgroundImage', 'url('+pokemon.sprites.front_shiny+')');
                    //             }else{
                    //                 setIsLoaded(false);
                    //                 let root = document.querySelector(':root');
                    //                 root.style.setProperty('--backGgroundImage', 'url('+pokemon.sprites.front_default+')');
                    //             }
                    //         },
                    //         (error) => {
                    //             setIsLoaded(true);
                    //             setError(error);
                    //         }
                    //     )
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <>
            {isLoaded === false &&
                <>
                    <div className="pokemonContent">
                        <div className="pkmn exit left">
                            <div className={balls[Math.floor(Math.random() * balls.length)]+" ball"}>
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
                            <div className={balls[Math.floor(Math.random() * balls.length)] + " ball"}>
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
