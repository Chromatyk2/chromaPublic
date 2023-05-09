import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";

function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  var numbers = [1,2,3,4,5,6,7,8,9];
  return(
      <>
        <ul className="box-list">
          {numbers.map((val, key) => {
            var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
            return (
                  <UniqueBox number={val} console={uniqueConsole}/>
            )
          })
          }
        </ul>
      </>
  )
}
export default NostalPick
