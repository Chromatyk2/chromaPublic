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
    const [typeBox, setTypeBox] = React.useState("basic");
    const [finalState, setFinalState] = React.useState(null);
    useEffect(() => {
        if(props.consolePicked == "GB"){
            setMax(432);
        }
        if(props.consolePicked == "GBA"){
            setMax(424);
        }
        if(props.consolePicked == "GBC"){
            setMax(233);
        }
        if(props.consolePicked == "MASTER SYSTEM"){
            setMax(194);
        }
        if(props.consolePicked == "MEGADRIVE"){
            setMax(400);
        }
        if(props.consolePicked == "N64"){
            setMax(133);
        }
        if(props.consolePicked == "NDS"){
            setMax(488);
        }
        if(props.consolePicked == "NES"){
            setMax(280);
        }
        if(props.consolePicked == "NGC"){
            setMax(234);
        }
        if(props.consolePicked == "PS1"){
            setMax(147);
        }
        if(props.consolePicked == "PSP"){
            setMax(286);
        }
        if(props.consolePicked == "SNES"){
            setMax(458);
        }
    }, [])
    function openBox(e) {
        setRandomNumber(Math.floor(Math.random()*max) + 1);
        var rarity = Math.floor(Math.random() * 100);
        if(rarity > 99){
                setTypeBox("ultra");
        }else if(rarity < 100 && rarity > 88){
                setTypeBox("legendary");
        }else if (rarity < 89 && rarity > 49){
                setTypeBox("rare");
        }else if( rarity < 50){
                setTypeBox("epic");
        }

        document.getElementById("box").classList.toggle("openAnimationBox");
        setTimeout(function() {
            document.getElementById("boxOpen").style.visibility = "visible";
        }.bind(this), 100000)
    }
    useEffect(() => {
        if(finalState !== null){
            setTimeout(function() {
                document.getElementById("imgGame"+randomNumber).style.display = "block";
            }.bind(this), 300)
        }
    }, [finalState])
    function handleState() {
        props.change();
    }

    return(
        <>
            <div>
                {randomNumber &&
                    <div style={{display: "none"}} className={"gettedGameImg"} onClick={handleState}
                         id={"imgGame" + randomNumber}>
                        <img className={"imgInBox"}
                             src={"/images/jaquettes/" + props.consolePicked + "/jaquette (" + randomNumber + ").png"}/>
                    </div>
                }
                <img id={"box"} onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"}
                     src={"/" + typeBox + ".png"}/>
                {typeBox != "basic" &&
                    <img id={"boxOpen"} style={{width: "500px", right: "475px", visibility:"hidden"}} className={"gettedBoxImg"} src={"/" + typeBox + "Open.png"}/>
                }
            </div>
        </>
    )
}

export default UniqueBoxV2
