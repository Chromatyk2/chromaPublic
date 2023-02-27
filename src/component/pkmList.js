import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  if(props.list.length > 0){
    return <p>Oui</p>
  }
}

export default PkmList
