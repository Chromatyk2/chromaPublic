import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function Pedandex() {
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    const name = result.names.find((element) => element.language.name == "fr").name;
                    const description = result.names.find((element) => element.language.name == "fr").name;
                })
    }, []);
        return (
            <>
                <div>
                    <p>Ceci est un texte de test pour voir comment ça marche !</p>
                </div>
            </>
        )
}
export default Pedandex
