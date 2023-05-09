import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";

function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  var numbers = [1,2,3,4,5,6,7,8,9];
  console.log(numbers);
  console.log(consoles);
  return(
      <>
        <ul className="box-list row">
          {numbers.map((val, key) => {
            return (
                <li className="col-4 uniqueBox">
                  <div id="one" className="button2">
                    <p className="nbBox">{val}</p>
                  </div>
                </li>
            )
          })
          }
        </ul>
      </>
  )
}
export default NostalPick
