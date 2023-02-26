import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function HomePage() {

const [userName,setUserName] = useState("");

const submitPost = () => {
Axios.get(`https://chromatyk-pokemon.herokuapp.com/api/getByUser/${pseudo}`)
}

    return (
        <div className="CreatePost">
            <div className="uploadPost">
                <label>Pseudo: </label>
                <input type="text" onChange={(e)=> {
                    setUserName(e.target.value)
                }}/>
                <button onClick={submitPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default HomePage
