import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import ProfilList from "./profilList";
import {Link} from "react-router-dom";
import allProfils from "./allProfils";

function RandomProfil(props) {
    const [allProfil,setAllProfil] = useState([]);
    const [randomIndex,setRandomIndex] = useState(0);
    useEffect(() => {
        Axios
            .get("/api/getAllProfil")
            .then(function(response){
                setAllProfil(response.data);
            })
    }, [])
    useEffect(() => {
        const interval = setInterval(
            () => setRandomIndex(Math.floor(Math.random() * allProfils.length)), 10000
        );
        return () => {
            clearInterval(interval);
        };
    }, [allProfil.length > 0]);
    console.log(allProfil);
    return (
        <>
            <p>Test</p>
        </>
    )
}

export default RandomProfil
