import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2One from "./uniqueBoxV2One.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function OneBox(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pickConsole, setPickConsole] = React.useState("null");
    const [randomConsoles, setRandomConsoles] = React.useState(null);
    var numbers = [1,2];
    useEffect(() => {
        var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES","NES","MASTER SYSTEM","GAMEGEAR","WII","PS2"];
        // var consoles = ["GBA","NDS","NGC","PSP","WII","SNES"];
        setRandomConsoles(consoles.sort(() => Math.random() - 0.5));
    }, []);
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'transparent!important',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', overflow:'hidden'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
    function openModal(e) {
        var uConsole = e.target.getAttribute("uConsole");
        var buttonClick = document.getElementById("buttonBox"+uConsole);
        setPickConsole(uConsole);
        buttonClick.classList.toggle("getBox");
        setTimeout(function() { //Start the timer
            setIsOpen(true);
            document.getElementById("boxContainerId").style.visibility = "hidden";
        }.bind(this), 800)
    }
    function handleState() {
        setIsOpen(false);
        document.getElementById("boxContainerId").style.visibility = "visible";
    }
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                    {randomConsoles &&
                        <>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button id={"buttonBox" + randomConsoles[2]} onClick={openModal}
                                    className={"uniqueBoxContainer"}>
                                <p className={"nbBox"}>2</p>
                                <img uConsole={randomConsoles[2]} className={"imgBox"} src={"/basic.png"}/>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                            <button style={{width: "215px"}} className={"uniqueBoxContainer"}>
                            </button>
                        </>}
            </div>
            <Modal overlayClassName={"OverlayNostal"} isOpen={modalIsOpen} style={customStyles.content} contentLabel="Example Modal" id={"modalBoxNostal"}>
                    <UniqueBoxV2One consolePicked = {pickConsole} change={handleState} />
                </Modal>
        </>
    )
}
export default OneBox
