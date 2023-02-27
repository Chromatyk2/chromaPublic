import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
    return (
       <>
           {pkmList == [] ? (
             <h1>Loading...</h1>
           ) : (
             pkmList.map((val, key) => {
               return (
                 <img src={val.pkmImage}></img>
               );
             })
           )}
       </>
     );
}

export default PkmList
