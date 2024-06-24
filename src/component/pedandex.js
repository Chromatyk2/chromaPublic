import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function Pedandex(props) {
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    const name = result.names.find((element) => element.language.name == "fr").name;
                    console.log(name);
                    const description = result.flavor_text_entries.find((element) => element.language.name == "fr").flavor_text;
                    console.log(description);
                })
    }, []);
    return (
        <>
            <p>Test</p>
        </>
    );
}
export default Pedandex
