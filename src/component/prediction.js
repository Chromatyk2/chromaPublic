import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import card from "../cards.png"
import $ from 'jquery';
function Prediction() {
    const [guess, setGuess] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getGuess")
            .then(function(response){
                setGuess(response.data);
            })
    }, [])
    return (
        <>
            {guess &&
                <div style={{position: "absolute",left: "500px",top: "200px",backgroundColor: "#120747",color: "white",borderRadius: "10px 0 0 10px",padding: "15px",width:"500px"}}>
                    <p style={{textAlign:"center", fontSize:"25px"}}>!prediction</p>
                    <table style={{width:"470px"}}>
                        <tr style={{fontFamily: "bungee",textAlign: "center"}}>
                            <th>Pseudo</th>
                            <th>Prédiction</th>
                        </tr>
                        {guess &&
                            guess.map((val, key) => {
                                if(key % 2){
                                    return (
                                        <tr>
                                            <td>{val.pseudo}</td>
                                            <td>{val.guess}</td>
                                        </tr>
                                    )
                                }else{
                                    return (
                                        <tr style={{backgroundColor: "#120747", color: "white"}}>
                                            <td>{val.pseudo}</td>
                                            <td>{val.guess}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </div>
            }
        </>
    );
}

export default Prediction
