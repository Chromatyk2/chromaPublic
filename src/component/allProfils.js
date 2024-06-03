import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function AllProfils(props) {
    const [allProfil,setAllProfil] = useState([]);
    useEffect(() => {
        Axios
            .get("/api/getAllProfil")
            .then(function(response){
                setAllProfil(response.data);
            })
    }, [])
    console.log(allProfil);
    return (
        <>
            <p>Profils</p>
        </>
    )
}

export default AllProfils
