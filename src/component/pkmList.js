import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  console.log(props.list.data);
  if(props.list.data){
    return <p>Oui</p>
  }
}

export default PkmList
