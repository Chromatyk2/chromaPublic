import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function Pedandex(props) {
    const [description, setDescription] = useState(null);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    const name = result.names.find((element) => element.language.name == "fr").name;
                    const description = result.flavor_text_entries.find((element) => element.language.name == "fr").flavor_text;
                    description.split(' ').forEach(word => {                  // loop over every word
                        const element = document.createElement("span");  // create element "span"
                        element.innerText = word;                        // set its content to word
                        element.onclick = () =>                          // onclick handler
                            element.style.background = '#000';             // action
                        document.body.appendChild(element);              // add element to dom
                    });
                    setDescription(description)
                })
    }, []);
    return (
        <>
            {description &&
                <p>{description}</p>
            }
        </>
    );
}

export default Pedandex
