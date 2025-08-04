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
                <>
                    <p>!prediction</p>
                    <table>
                        <tr>
                            <th>Pseudo</th>
                            <th>Prédiction</th>
                        </tr>
                        {
                            guess.data.map((val, key) => {
                                return (
                                    <tr>
                                        <td>{val.pseudo}</td>
                                        <td>{val.guess}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </>
            }
        </>
    );
}

export default Prediction
