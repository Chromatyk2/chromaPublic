import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
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
        <div className={"shinydexContainer"}>
            {shinydex &&
                shinydex.map((val, key) => {
                    return(
                        <div className={"shinydexCard"}>
                            <div className={"shinydexName"}>#{val.pkmId} {val.pokemon}<br/>{val.surnom}</div>
                        </>
                    )
                })
            }
        </div>
    );
}

export default Shinydex;
