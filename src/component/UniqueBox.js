import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import '../App.css';
import $ from 'jquery';

function UniqueBox(props) {
    if(props.console == "GB"){
        var max = 432
    }
    if(props.console == "GBA"){
        var max = 424
    }
    if(props.console == "GBC"){
        var max = 233
    }
    if(props.console == "MASTER SYSTEM"){
        var max = 194
    }
    if(props.console == "MEGADRIVE"){
        var max = 400
    }
    if(props.console == "N64"){
        var max = 133
    }
    if(props.console == "NDS"){
        var max = 488
    }
    if(props.console == "NES"){
        var max = 280
    }
    if(props.console == "NGC"){
        var max = 234
    }
    if(props.console == "PS1"){
        var max = 147
    }
    if(props.console == "PSP"){
        var max = 286
    }
    if(props.console == "SNES"){
        var max = 458
    }
    var randomNumber = Math.floor(Math.random()*max) + 1;
    function displayNormalLaderboard(e) {
        var boxNumber = e.target.getAttribute("number").value;
        console.log(boxNumber);
        var box = $(".boxnb"+boxNumber);
        console.log(box);
        box.parent(".button2").parent(".box-list li").attr('checked','checked');
        if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({
                "top": $("#centerBox").position().top,
                "left": $("#centerBox").position().left
            }, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px", "left": "-250px"}, 1500);
        } else if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "200px"}, 1500);
        } else if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "200px", "left": "-250px"}, 1500);
        } else if (($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"left": "250px"}, 1500);
        } else if (($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"left": "-250px"}, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px", "left": "250px"}, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px"}, 1500);
        }
    }

    return(
        <li onClick={displayNormalLaderboard} className={"uniqueBox boxnb"+props.number} id={props.number === 5 ? 'centerBox' : 'otherBox'} number={props.number}>
            <div id="one" className="button2">
                <p className="nbBox">{props.number}</p>
                <div type="button" className="button2 box closed"></div>
            </div>
        </li>
    )
}
export default UniqueBox