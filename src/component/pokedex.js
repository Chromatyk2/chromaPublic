import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function Pokedex(props) {
const [list,setList] = useState([]);
const pseudo = props.cookies.user.data[0].login;
  useEffect(() => {
    Axios
      .get("https://chromatyk-pokemon.herokuapp.com/api/getByUser/"+pseudo)
      .then(function(response){
          setList(response.data);
      })
    }, [])
    return (
      <>
        <div>
          <PkmList list={list}/>
        </div>
      </>
    )
}

export default Pokedex
