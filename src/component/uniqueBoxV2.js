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
        if(props.console == "GB"){
            setMax(432);
        }
        if(props.console == "GBA"){
            setMax(424);
        }
        if(props.console == "GBC"){
            setMax(233);
        }
        if(props.console == "MASTER SYSTEM"){
            setMax(194);
        }
        if(props.console == "MEGADRIVE"){
            setMax(400);
        }
        if(props.console == "N64"){
            setMax(133);
        }
        if(props.console == "NDS"){
            setMax(488);
        }
        if(props.console == "NES"){
            setMax(280);
        }
        if(props.console == "NGC"){
            setMax(234);
        }
        if(props.console == "PS1"){
            setMax(147);
        }
        if(props.console == "PSP"){
            setMax(286);
        }
        if(props.console == "SNES"){
            setMax(458);
        }
    }, [])
    function openBox(e) {
        setRandomNumber(Math.floor(Math.random()*max) + 1);
        console.log(randomNumber);
    }
    return(
        <>
            <div className={"gettedBoxContainer"}>
                {randomNumber &&
                    <img className={"gettedGameImg"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette("+randomNumber+").png"}/>
                }
                <img onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/basicBox.png"}/>
            </div>
        </>
    )
}
export default UniqueBoxV2
