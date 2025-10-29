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
            <p style="text-align: center; color: white;">Retrouve ici l'ensemble des shinys capturés en live avec les liens des VODs</p>
            <div className={"shinydexContainer"}>
                {shinydex &&
                    shinydex.map((val, key) => {
                        return (
                            <div className={"shinydexCard"}>
                                <div className={"shinydexName"}>#{val.idPkm} {val.pokemon}<br/><span>{val.surnom}</span></div>
                                <div className={"shinydexSpriteContainer"}>
                                    <div>
                                        <img className={"shinydexSprite"} src={"/Shinydex/classic/" + val.idPkm + ".gif"}/>
                                    </div>
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
