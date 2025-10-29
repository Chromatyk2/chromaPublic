import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

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
            <p style={{textAlign: "center", color: "white", marginBottom:"35px"}}>Retrouve ici l'ensemble des shinys capturés en live avec les liens des VODs</p>
            <div className={"shinydexContainer"}>
                {shinydex &&
                    shinydex.map((val, key) => {
                        return (
                            <div className={"shinydexCard"}>
                                <div className={"shinydexName"}>#{val.idPkm} {val.pokemon}<br/><span className={"spanShinydex"}>{val.surnom}</span></div>
                                <div className={"shinydexSpriteContainer"}>
                                    <div style={{display:"flex"}}>
                                        <img className={"shinydexSprite"} src={"/Shinydex/shiny/" + val.idPkm + ".gif"}/>
                                    </div>
                                    <a target={"_blank"} href={val.lien}><img className={"linkShinydex"} src={"/youtube.png"}/></a>
                                </div>
                                <div className={"description"}>
                                    {moment(val.date).utc().format('DD/MM/YYYY')}<br/><span className={"spanShinydex"}>{val.version}</span><br/>{val.description}
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
