import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const [list,setList] = useState([]);
  useEffect(() => {
    setList(props.list.data);
  }, [props.list])
  console.log(list);
  if(list){
    return <p>Oui</p>
  }
}

export default PkmList
