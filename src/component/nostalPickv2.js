import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';

function NostalPickV2(props) {
    var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    function displayModal(e) {
        $('audio#loose')[0].pause();
        $('audio#loose')[0].currentTime = 0;
        $('audio#greenWin')[0].pause();
        $('audio#greenWin')[0].currentTime = 0;
        $('audio#blueWin')[0].pause();
        $('audio#blueWin')[0].currentTime = 0;
        $('audio#orangeWin')[0].pause();
        $('audio#orangeWin')[0].currentTime = 0;
        $('audio#rainbowWin')[0].pause();
        $('audio#rainbowWin')[0].currentTime = 0;
        $('#containerGlobal').css("background-color","rgba(0,0,0,0)");
        var others = $('.box-list li').not($("[checked=checked],[alreadyopen=alreadyopen]"));
        others.css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 1500);
        $('[alreadyopen]').css("visibility","hidden")
        $('[alreadyopen]').css("top","0")
        $('[alreadyopen]').css("left","0")
        $("[checked=checked]").css("visibility","hidden");
        $("[checked=checked]").attr("alreadyopen","alreadyopen");
        $("[checked=checked]").removeAttr("checked");
        $('.one').addClass('out');
        $('body').removeClass('modal-active');
    };
    return(
        <>
            <div>
                <ul className="boxContainer">
                    {numbers.map((val, key) => {
                        var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
                        var consoleIndex = consoles.indexOf(uniqueConsole);
                        consoles.splice(consoleIndex, 1);
                        return (
                            <UniqueBox number={val} console={uniqueConsole}/>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
export default NostalPickV2
