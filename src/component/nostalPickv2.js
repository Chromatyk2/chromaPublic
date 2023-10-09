import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function NostalPickV2(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pickConsole, setPickConsole] = React.useState("null");
    var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'none',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
    function openModal(e) {
        console.log(e.target);
        var uConsole = e.target.value;
        setPickConsole(uConsole);
        setIsOpen(true);
    }
    return(
        <>
            <div className="boxContainer">
                    {numbers.map((val, key) => {
                        var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
                        var consoleIndex = consoles.indexOf(uniqueConsole);
                        consoles.splice(consoleIndex, 1);
                        return (
                            <button onClick={openModal} className={"uniqueBoxContainer"}  value={uniqueConsole}>
                                <p className={"nbBox"}>{val}</p>
                                <img className={"imgBox"} src={"/basicBox.png"}/>
                            </button>
                        )
                    })}
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
                <p>{pickConsole}</p>
            </Modal>
        </>
    )
}
export default NostalPickV2
