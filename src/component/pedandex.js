import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function Pedandex(props) {
    const [name, setName] = useState("Wailord");
    const [words, setWords] = useState([]);
    const inputRef = useRef();
    useEffect(() => {
        const description = "Wailord est un imposant Pokémon marin inspiré de la baleine bleue (et non du cachalot comme le suggère le Pokédex). Son corps fusiforme est à mi-chemin entre un sous-marin, un dirigeable et une torpille géante. La moitié supérieure de son corps est bleue, la moitié inférieure blanche. Il a de petits yeux noirs, une large bouche, quatre taches blanches le long de son dos et une gorge striée de rainures. Il se meut avec deux paires de nageoires latérales, une paire de nageoires pelviennes et une nageoire caudale horizontale.";
        var id = 0;
        var div = document.getElementById("descriptionPedandex");
        description.split(' ').forEach(word => {
            var regex = /\b(Basic|Standard|Superior|Deluxe|Private)\b/gi
            setWords(words => [...words,word]);
            const element = document.createElement("span");  // create element "span"
            element.innerText = word.replace(/[^.]/g,'x');
            element.style.marginRight = '10px';
            element.setAttribute("id", id);
            element.setAttribute("class", "itemDescription");
            id++;
            div.appendChild(element);
        });
    }, []);
    const handleSubmit = (event) => {
        console.log(words.find((element) => element == inputRef.current.value));
        event.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit} style={{margin: '20px'}}>
                <label style={{marginRight: '10px'}}>
                    Name:
                    <input type="text" ref={inputRef} style={{marginLeft: '5px'}}/>
                </label>
                <button type="submit" style={{display: 'block', marginTop: '10px'}}>
                    Submit
                </button>
            </form>
            <div className={"contentContainer"}>
                <div id={"descriptionPedandex"}>
                    <p style={{width: "100%", fontSize: "50px", textAlign: "center"}} className={"itemDescription"}
                       id={"padandexName"}>{name}</p>
                </div>
            </div>
        </>
    );
}

export default Pedandex
