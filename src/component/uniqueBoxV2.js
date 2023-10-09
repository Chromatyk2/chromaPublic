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
        $('audio#karateka')[0].play()
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
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
                            $('audio#rainbowWin')[0].play()
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
                            $('audio#orangeWin')[0].play()
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
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
                        $('audio#karateka')[0].pause()
                        $('audio#karateka')[0].currentTime = 0
                        $('audio#blueWin')[0].play()
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
                    $('audio#karateka')[0].pause()
                    $('audio#karateka')[0].currentTime = 0
                    $('audio#greenWin')[0].play()
                }.bind(this), 3000)
            }
        }else{
            setTimeout(function() {
                document.getElementById("box").classList.toggle("spinBox");
                setTypeBox("basicOpen");
                setFinalState("basic");
                $('audio#karateka')[0].pause()
                $('audio#karateka')[0].currentTime = 0
                $('audio#loose')[0].play()
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
            <audio id="karateka">
                <source src="sounds/karateka.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="loose">
                <source src="sounds/Loose.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="greenWin">
                <source src="sounds/GreenWin.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="blueWin">
                <source src="sounds/BlueWin.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="orangeWin">
                <source src="sounds/OrangeWin.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="rainbowWin">
                <source src="sounds/RainbowWin.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}
export default UniqueBoxV2
