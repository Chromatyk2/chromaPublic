import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function HomePage() {

const [pseudo,setPseudo] = useState("");
const [list,setList] = useState([]);
const submitPost = () => {
    Axios
      .get(`https://chromatyk-pokemon.herokuapp.com/api/getByUser/${pseudo}`)
      .then(function(response){
          setList(response.data);
    })
}
console.log(list);
    return (
      <>
        <div>
        <PkmList list={list}/>
        </div>
        <div className="CreatePost">
            <div className="uploadPost">
                <label>Pseudo: </label>
                <input type="text" onChange={(e)=> {
                    setPseudo(e.target.value)
                }}/>
                <button onClick={submitPost}>Submit Post</button>
            </div>
        </div>
      </>
    )
}

export default HomePage
