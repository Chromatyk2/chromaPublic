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
        var rare = Math.floor(Math.random() * 100);
        if(rare < 76){
            var epic = Math.floor(Math.random() * 100);
            if(epic > 59) {
                var legendary = Math.floor(Math.random() * 100);
                if(legendary > 67){
                    var ultra = Math.floor(Math.random() * 100);
                    if(ultra > 89){
                        setTypeBox("ultra");
                    }else
                        setTypeBox("legendary");
                }else{
                    setTypeBox("epic");
                }
            }else {
                setTypeBox("rare");
            }
        }else{
            setTypeBox("basic");
        }
    }
    useEffect(() => {
        if(randomNumber !== null){
            document.getElementById("imgGame"+randomNumber).style.display = "block";

        }
    }, [randomNumber])
    return(
        <>
            <div className={"gettedBoxContainer"}>
                {randomNumber &&
                    <img style={{display:"none"}} id={"imgGame"+randomNumber} className={"gettedGameImg"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette ("+randomNumber+").png"}/>
                }
                <img id={"box"} onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={typeBox == "rare" ? "/rareBox.png" : typeBox == "epic" ? "/epicBox.png" : typeBox == "legendary" ? "/legendaryBox.png" : typeBox == "ultra" ? "/ultraBox.png" : "/basicBox.png"}/>
            </div>
        </>
    )
}
export default UniqueBoxV2
