import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmListTeam from './pkmListTeam.js'

function PokedexTeam(props) {
    const [list,setList] = useState([]);
    const pseudo = props.cookies.user.data[0].login;
    useEffect(() => {
        Axios
            .get("/api/getByUser/"+pseudo)
            .then(function(response){
                setList(response.data);
            })
    }, [])
    return (
        <>
            <div  style={{paddingTop:"15px",minHeight:"100%"}} className={"contentContainer"}>
                <PkmListTeam pkmToUpdate={props.pkmToUpdate} list={list}/>
            </div>
        </>
    )
}

export default PokedexTeam