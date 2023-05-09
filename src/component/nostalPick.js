import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";

function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  function PickBox(){
      console.log(consoles);
  }
  for (var i = 0; i<= 8;i++){
      return(
          <>
            <UniqueBox/>
          </>
      )
  }
}
export default NostalPick
