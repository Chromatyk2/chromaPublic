import React,{useState, useEffect} from 'react';
import Axios from "axios";

function Shinydex() {

    const [shinydex, setShinydex] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getShinydex")
            .then(function(response) {
                setShinydex(response.data)
            })
    }, []);
    return (
        <>
            <p className="pseudoProfil">Shinydex de Chromatyk</p>
            <small>Retrouve ici l'enssemble des shiny capturer en live et les liens des VODs</small>
            <div className={"shinydexContainer"}>
                {shinydex &&
                    shinydex.map((val, key) => {
                        return (
                            <div className={"shinydexCard"}>
                                <div className={"shinydexName"}>#{val.idPkm} {val.pokemon}<br/><span>{val.surnom}</span></div>
                                <div className={"shinydexSpriteContainer"}>
                                    <img className={"shinydexSprite"} src={"/Shinydex/classic/"+val.idPkm+".gif"}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Shinydex;
