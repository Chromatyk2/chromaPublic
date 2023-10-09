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
        document.getElementById("box").classList.toggle("spinBox");
        var rare = Math.floor(Math.random() * 100);
        if(rare < 100){
            var epic = Math.floor(Math.random() * 100);
            if(epic > 70) {
                var legendary = Math.floor(Math.random() * 100);
                if(legendary > 64){
                    var ultra = Math.floor(Math.random() * 100);
                    if(ultra > 94){
                        setTimeout(function() {
                            setTypeBox("rare");
                        }.bind(this), 1000)
                        setTimeout(function() {
                            setTypeBox("epic");
                        }.bind(this), 3000)
                        setTimeout(function() {
                            setTypeBox("legendary");
                        }.bind(this), 5000)
                        setTimeout(function() {
                            setTypeBox("ultra");
                        }.bind(this), 7000)
                        setTimeout(function() {
                            document.getElementById("box").classList.toggle("spinBox");
                            setTypeBox("ultraOpen");
                            setFinalState("ultra");
                        }.bind(this), 8000)
                    }else{
                        setTimeout(function() {
                            setTypeBox("rare");
                        }.bind(this), 1000)
                        setTimeout(function() {
                            setTypeBox("epic");
                        }.bind(this), 3000)
                        setTimeout(function() {
                            setTypeBox("legendary");
                        }.bind(this), 5000)
                        setTimeout(function() {
                            document.getElementById("box").classList.toggle("spinBox");
                            setTypeBox("legendaryOpen");
                            setFinalState("lgendary");
                        }.bind(this), 6000)
                    }
                }else{
                    setTimeout(function() {
                        setTypeBox("rare");
                    }.bind(this), 1000)
                    setTimeout(function() {
                        setTypeBox("epic");
                    }.bind(this), 3000)
                    setTimeout(function() {
                        document.getElementById("box").classList.toggle("spinBox");
                        setTypeBox("epicOpen");
                        setFinalState("epic");
                    }.bind(this), 4000)
                }
            }else {
                setTimeout(function() {
                    setTypeBox("rare");
                }.bind(this), 1000)
                setTimeout(function() {
                    document.getElementById("box").classList.toggle("spinBox");
                    setTypeBox("rareOpen");
                    setFinalState("rare");
                }.bind(this), 3000)
            }
        }else{
            setTimeout(function() {
                document.getElementById("box").classList.toggle("spinBox");
                setTypeBox("basicOpen");
                setFinalState("basic");
            }.bind(this), 100)
        }
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
            <div className={"gettedBoxContainer"}>
                {randomNumber &&
                    <img onClick={handleState} style={{display:"none"}} id={"imgGame"+randomNumber} className={"gettedGameImg"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette ("+randomNumber+").png"}/>
                }
                <img id={"box"} onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/"+typeBox+".png"} />
            </div>
        </>
    )
}
export default UniqueBoxV2
