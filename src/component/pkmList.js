import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const [list,setList] = useState([]);
  useEffect(() => {
    setList(props.list.data);
  }, [props.list])
    return (
        {list &&
          <p>C'est Ok</p>
        }
    )
}

export default PkmList
