import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function UniqueBoxV2One(props) {
    const [randomNumber, setRandomNumber] = React.useState(null)
    const [max, setMax] = React.useState(null);
    const [typeBox, setTypeBox] = React.useState("basic");
    const [finalState, setFinalState] = React.useState(null);
    useEffect(() => {
        if(props.consolePicked == "GB"){
            setMax(288);
        }
        if(props.consolePicked == "GBA"){
            setMax(344);
        }
        if(props.consolePicked == "GBC"){
            setMax(192);
        }
        if(props.consolePicked == "MASTER SYSTEM"){
            setMax(142);
        }
        if(props.consolePicked == "MEGADRIVE"){
            setMax(252);
        }
        if(props.consolePicked == "N64"){
            setMax(96);
        }
        if(props.consolePicked == "NDS"){
            setMax(465);
        }
        if(props.consolePicked == "NES"){
            setMax(193);
        }
        if(props.consolePicked == "NGC"){
            setMax(214);
        }
        if(props.consolePicked == "PS1"){
            setMax(75);
        }
        if(props.consolePicked == "PSP"){
            setMax(234);
        }
        if(props.consolePicked == "SNES"){
            setMax(375);
        }
        if(props.consolePicked == "DREAMCAST"){
            setMax(41);
        }
        if(props.consolePicked == "GAMEGEAR"){
            setMax(222);
        }
        if(props.consolePicked == "WII"){
            setMax(50);
        }
        if(props.consolePicked == "PS2"){
            setMax(20);
        }
    }, [])
    function openBox(e) {
        setRandomNumber(Math.floor(Math.random()*max) + 1);
        setTypeBox("ultra");
        document.getElementById("boxBefore").classList.toggle("openAnimationBox");
        setTimeout(function() {
            document.getElementById("boxCloseLegendary").style.visibility = "hidden";
            document.getElementById("boxOpen").style.visibility = "visible";
            document.getElementById("boxOpen").style.transform = "scale(1.3)";
            setFinalState("done");
        }.bind(this), 2000)
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

    useEffect(() => {
        if(randomNumber !== null){
            Axios.post('/api/addCurrentImage',
                {
                    title:"Jeu (" + randomNumber + ").png",
                    plateforme:props.consolePicked

                }
            )

        }
    }, [randomNumber]);
    return(
        <>
            <div>
                {randomNumber &&
                    <div style={{display: "none"}} className={"gettedGameImg"} onClick={handleState}
                         id={"imgGame" + randomNumber}>
                        <img className={"imgInBox"} src={"/images/jaquettes/" + props.consolePicked + "/Jeu (" + randomNumber + ").png"}/>
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
                    <img id={"boxOpen"} style={{width: "450px", right: "600px", visibility: "hidden"}}
                         src={"/" + typeBox + "Open.png"}/>
                }
            </div>
        </>
    )
}

export default UniqueBoxV2One
