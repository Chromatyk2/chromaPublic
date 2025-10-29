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
            <div className={"shinydexContainer"}>
                {shinydex &&
                    shinydex.map((val, key) => {
                        return (
                            <div className={"shinydexCard"}>
                                <div className={"shinydexName"}>#{val.pkmId} {val.pokemon}<br/>{val.surnom}</div>
                            </>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Shinydex;
