import React,{useState, useEffect, useRef} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function Pedandex(props) {
    const [name, setName] = useState("Mustébouée");
    const [words, setWords] = useState([]);
    const inputRef = useRef();
    useEffect(() => {
        document.getElementById("padandexName").innerText = name.replace(/[^.]/g,'x');;
        const description = "Il utilise la bouée autour de son cou pour passer la tête hors de l'eau et observer les alentours. L'organe de flottaison sur son cou gonfle comme une bouée lorsqu'il le remplit d'air. Quand il flotte, il garde la tête hors de l'eau. Il nage en faisant tournoyer ses deux queues comme une hélice. Son organe de flottaison se dégonfle quand il plonge.";
        var id = 0;
        var div = document.getElementById("textToGuess");
        const correction = {
            ",": " ,",
            "?": " ?",
            ":": " : ",
            "'": " ' ",
            "(": " ( ",
            ")": " ) ",
            "/": " / ",
            ".": " ."
        };
        description.replace(/,|\?|\/|\\|\:|\(|\)|\'|\./g, matched => correction[matched]).split(" ").forEach(word => {
            var regex = /\b(Basic|Standard|Superior|Deluxe|Private)\b/gi
            setWords(words => [...words,word]);
            const element = document.createElement("span");
            console.log(word !== "'")
            if(word != " ' " || word != " , ")
            {// create element "span"
                element.innerText = word.replace(/[^.]/g,'x');
                element.style.marginRight = '10px';
                element.setAttribute("id", id);
                element.setAttribute("class", "itemDescription");
            }else{
                element.innerText = word;
                element.style.background = 'none';
            }
            id++;
            div.appendChild(element);
        });
    }, []);
    const handleSubmit = (event) => {
        words.map((val, key) => {
            if(val.toLowerCase() == inputRef.current.value.toLowerCase()){
                var id = key;
                document.getElementById(id).innerText = val;
                document.getElementById(id).style.background = 'none';
            }
        })
        if(inputRef.current.value.toLowerCase() == name.toLowerCase()){
            document.getElementById("padandexName").innerText = name
            document.getElementById("padandexName").style.background = 'none'
            words.map((val, key) => {
                var id = key;
                document.getElementById(id).innerText = val;
                document.getElementById(id).style.background = 'none';
            })
        }
        inputRef.current.value = "";
        event.preventDefault();
    };
    return (
        <>
            <div className={"contentContainer"}>
                <form className={"formPed"} onSubmit={handleSubmit} style={{margin: '20px'}}>
                    <label style={{marginRight: '10px'}}>
                        <input defaultValue={""} type="text" ref={inputRef} style={{marginLeft: '5px'}}/>
                    </label>
                    <button type="submit" style={{display: 'block', marginTop: '10px'}}>
                        Valider
                    </button>
                </form>
                <div id={"descriptionPedandex"}>
                    <p style={{fontSize: "50px", textAlign: "center"}} className={"itemDescription"} id={"padandexName"}>{name}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}} id={"textToGuess"}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Pedandex
