import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function UniqueBoxV2(props) {
    const [randomNumber, setRandomNumber] = React.useState(null)
    const [max, setMax] = React.useState(null);
    useEffect(() => {
    }, [])
    function openBox(e) {
        if(props.console == "GB"){
            setRandomNumber(Math.floor(Math.random() * 432) + 1);
        }
        if(props.console == "GBA"){
            setRandomNumber(Math.floor(Math.random()*424) + 1);
        }
        if(props.console == "GBC"){
            setRandomNumber(Math.floor(Math.random()*233) + 1);
        }
        if(props.console == "MASTER SYSTEM"){
            setRandomNumber(Math.floor(Math.random()*194) + 1);
        }
        if(props.console == "MEGADRIVE"){
            setRandomNumber(Math.floor(Math.random()*400) + 1);
        }
        if(props.console == "N64"){
            setRandomNumber(Math.floor(Math.random()*133) + 1);
        }
        if(props.console == "NDS"){
            setRandomNumber(Math.floor(Math.random()*488) + 1);
        }
        if(props.console == "NES"){
            setRandomNumber(Math.floor(Math.random()*280) + 1);
        }
        if(props.console == "NGC"){
            setRandomNumber(Math.floor(Math.random()*234) + 1);
        }
        if(props.console == "PS1"){
            setRandomNumber(Math.floor(Math.random()*147) + 1);
        }
        if(props.console == "PSP"){
            setRandomNumber(Math.floor(Math.random()*286) + 1);
        }
        if(props.console == "SNES"){
            setRandomNumber(Math.floor(Math.random()*458) + 1);
        }
    }
    return(
        <>
            <div className={"gettedBoxContainer"}>
                {randomNumber &&
                    <img className={"gettedGameImg"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette ("+randomNumber+").png"}/>
                }
                <img onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/basicBox.png"}/>
            </div>
        </>
    )
}
export default UniqueBoxV2
