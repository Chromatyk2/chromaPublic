import React, {useEffect, useState} from 'react';
import '../App.css'
function SpawnPokemon(props) {

    var sparkle = document.getElementById("sparkle");
    var sparkles = document.getElementById("sparkles");
    var ctx = sparkles.getContext("2d");
    var particles = [];

    function addSparkles(){
        for (var i = 0; i < 8; i++) particles.push({ "scale": 1, "radius": 60, "angle": 45 * i });
    }

    function drawSparkles(){
        ctx.clearRect(0, 0, 256, 256);
        for (p of particles){
            var x = 128 + p.radius * Math.cos(p.angle * Math.PI / 180);
            var y = 128 + p.radius * Math.sin(p.angle * Math.PI / 180);
            var scaled = Math.max(32 * p.scale, 0);
            ctx.drawImage(sparkle, x - scaled / 2, y - scaled / 2, scaled, scaled);
            if (p.scale > 0.6) p.scale -= 0.2;
            else p.scale -= 0.05;
            p.angle -= 5;
            p.radius += 5;
        }
    }


    const pseudo = props.cookies.user.data[0].login;
    const [pokemon, setPokemon] = useState([])
    const [balls, setBalls] = useState(['poke','great','ultra','safari','premier','sport','net','dive','nest','repeat','timer','luxury','dusk','heal','quick','fast','level','lure','heavy','love','friend','moon','park','dream','beast']);
    const [useBall, setUseBall] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [reloadFetch, setReloadFetch] = useState(0);
    const [shiny, setShiny] = useState(false);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    const isLegendary = Math.floor((Math.random() * 2) + 1);
                    const isMythical = Math.floor((Math.random() * 2) + 1);
                    const isShiny = Math.floor((Math.random() * 1) + 1);
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
                                                        setShiny(true);
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
                                                                setShiny(true);
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
                                                        setShiny(true);
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
                            <div className="mon">
                                {shiny === true && <canvas id="sparkles" width="256" height="256"></canvas> }
                            </div>
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
                            <div className="mon">
                                {shiny === true && <canvas id="sparkles" width="256" height="256"></canvas> }
                            </div>
                            <div className="explode"></div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default SpawnPokemon
