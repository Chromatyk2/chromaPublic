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
        var rarity = Math.floor(Math.random() * 101);
        console.log(rarity)
        if(rarity > 95){
                setTypeBox("ultra");
                document.getElementById("boxBefore").classList.toggle("openAnimationBox");
                setTimeout(function() {
                    document.getElementById("box").style.visibility = "hidden";
                    document.getElementById("boxCloseRare").style.visibility = "visible";
                    document.getElementById("boxCloseRare").classList.toggle("bumpRare");
                }.bind(this), 2000)
                setTimeout(function() {
                    document.getElementById("boxCloseRare").style.visibility = "hidden";
                    document.getElementById("boxCloseEpic").style.visibility = "visible";
                    document.getElementById("boxCloseEpic").classList.toggle("bumpEpic");
                }.bind(this), 4000)
                setTimeout(function() {
                    document.getElementById("boxCloseEpic").style.visibility = "hidden";
                    document.getElementById("boxCloseLegendary").style.visibility = "visible";
                    document.getElementById("boxCloseLegendary").classList.toggle("bumpLegendary");
                }.bind(this), 6000)
                setTimeout(function() {
                    document.getElementById("boxCloseLegendary").style.visibility = "hidden";
                    document.getElementById("boxOpen").style.visibility = "visible";
                    document.getElementById("boxOpen").style.transform = "scale(1.6)";
                    setFinalState("done");
                }.bind(this), 9000)
        }else if(rarity < 95 && rarity > 79){
                setTypeBox("legendary");
            document.getElementById("boxBefore").classList.toggle("openAnimationBox");
            setTimeout(function() {
                document.getElementById("box").style.visibility = "hidden";
                document.getElementById("boxCloseRare").style.visibility = "visible";
                document.getElementById("boxCloseRare").classList.toggle("bumpRare");
            }.bind(this), 2000)
            setTimeout(function() {
                document.getElementById("boxCloseRare").style.visibility = "hidden";
                document.getElementById("boxCloseEpic").style.visibility = "visible";
                document.getElementById("boxCloseEpic").classList.toggle("bumpEpic");
            }.bind(this), 4000)
            setTimeout(function() {
                document.getElementById("boxCloseEpic").style.visibility = "hidden";
                document.getElementById("boxCloseLegendary").style.visibility = "visible";
                document.getElementById("boxCloseLegendary").classList.toggle("bumpLegendary");
            }.bind(this), 6000)
            setTimeout(function() {
                document.getElementById("boxCloseLegendary").style.visibility = "hidden";
                document.getElementById("boxOpen").style.visibility = "visible";
                document.getElementById("boxOpen").style.transform = "scale(1.6)";
                setFinalState("done");
            }.bind(this), 9000)
        }else if (rarity < 80 && rarity > 49){
                setTypeBox("rare");
            document.getElementById("boxBefore").classList.toggle("openAnimationBox");
            setTimeout(function() {
                document.getElementById("box").style.visibility = "hidden";
                document.getElementById("boxCloseRare").style.visibility = "visible";
                document.getElementById("boxCloseRare").classList.toggle("bumpRare");
            }.bind(this), 2000)
            setTimeout(function() {
                document.getElementById("boxCloseRare").style.visibility = "hidden";
                document.getElementById("boxOpen").style.visibility = "visible";
                document.getElementById("boxOpen").style.transform = "scale(1.2)";
                setFinalState("done");
            }.bind(this), 5000)
        }else if( rarity < 50){
                setTypeBox("epic");
            document.getElementById("boxBefore").classList.toggle("openAnimationBox");
            setTimeout(function() {
                document.getElementById("box").style.visibility = "hidden";
                document.getElementById("boxCloseRare").style.visibility = "visible";
                document.getElementById("boxCloseRare").classList.toggle("bumpRare");
            }.bind(this), 2000)
            setTimeout(function() {
                document.getElementById("boxCloseRare").style.visibility = "hidden";
                document.getElementById("boxCloseEpic").style.visibility = "visible";
                document.getElementById("boxCloseEpic").classList.toggle("bumpEpic");
            }.bind(this), 4000)
            setTimeout(function() {
                document.getElementById("boxCloseEpic").style.visibility = "hidden";
                document.getElementById("boxOpen").style.visibility = "visible";
                document.getElementById("boxOpen").style.transform = "scale(1.4)";
                setFinalState("done");
            }.bind(this), 7000)
        }
    }
    useEffect(() => {
        if(finalState !== null){
            setTimeout(function() {
                document.getElementById("imgGame"+randomNumber).style.display = "block";
            }.bind(this), 0)
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
                <div style={{animationIterationCount: 20}} id={"boxBefore"}>
                    <img id={"box"} onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"}
                         src={"/basic.png"}/>
                    <img style={{visibility: "hidden"}} id={"boxCloseRare"} onClick={openBox} uConsole={props.consolePicked}
                         src={"/rare.png"}/>
                    <img style={{visibility: "hidden"}} id={"boxCloseEpic"} onClick={openBox} uConsole={props.consolePicked}
                         src={"/epic.png"}/>
                    <img style={{visibility: "hidden"}} id={"boxCloseLegendary"} onClick={openBox} uConsole={props.consolePicked}
                         src={"/legendary.png"}/>
                </div>
                {typeBox != "basic" &&
                    <img id={"boxOpen"} style={{width: "500px", right: "475px", visibility: "hidden"}}
                         className={"gettedBoxImg"} src={"/" + typeBox + "Open.png"}/>
                }
            </div>
        </>
    )
}

export default UniqueBoxV2
