import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';

function NostalPickV2(props) {
    var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    return(
        <>
            <div className="boxContainer">
                    {numbers.map((val, key) => {
                        var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
                        var consoleIndex = consoles.indexOf(uniqueConsole);
                        consoles.splice(consoleIndex, 1);
                        return (
                            <button className={"uniqueBoxContainer"}>
                                <p>{val}</p>
                                <img className={"imgBox"} src={"/basicBox.png"}/>
                            </button>
                        )
                    })}
            </div>
        </>
    )
}
export default NostalPickV2
