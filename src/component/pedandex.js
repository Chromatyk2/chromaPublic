import React,{useState, useEffect, useRef} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function Pedandex(props) {
    const [name, setName] = useState("Terrakium");
    const [words, setWords] = useState([]);
    const inputRef = useRef();
    useEffect(() => {
        document.getElementById("padandexName").innerText = name.replace(/[^.]/g,'x');;
        const description = "Pokémon de type Roche/Combat de cinquième génération. Terrakium représente Porthos des Trois Mousquetaires, et donc la force. C'est un Pokémon quadrupède gris possédant une forte musculature et dont la physionomie pourrait être inspirée de celle du bélier, animal également connu pour ses charges puissantes. Il possède des protections sur les pattes ainsi que sur les épaules. Son large visage menaçant est surmonté d'une couronne noire, formant deux larges cornes plates vers l'avant, et se prolongeant le long du dos comme deux courtes crêtes.";
        var id = 0;
        var div = document.getElementById("textToGuess");
        const correction = {
            ",": " , ",
            "?": " ? ",
            ":": " : ",
            "'": " ' ",
            "(": " ( ",
            ")": " ) ",
            "/": " / ",
            ".": " ."
        };
        description.replace(/,|\?|\/|\\|\:|\(|\)|\'|\./g, matched => correction[matched]).split(" ").forEach(word => {
            const correction2 = {
                " , ": ", ",
                " ? ": " ?",
                " : ": " : ",
                " ' ": "'",
                " / ": "/",
                ".": ". "
            };
            setWords(words => [...words,word]);
            const element = document.createElement("span");
            element.setAttribute("id", id);
            if(word === "'" || word ==="." || word ==="," || word ==="?" || word ===":" || word ==="(" || word ===")" || word ==="/"){
                element.innerText = word.trim();
                element.style.background = 'none';
                element.style.marginRight = '0';
            }else if(word === ""){
                element.style.display = "none";
            }
            else{
                element.innerText = word.replace(/[^.]/g,'x');
            }
            element.setAttribute("class", "itemDescription");
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
                <p style={{color: "white", textAlign: "center"}}>Trouvez le pokémon du jour, ATTENTION les accents
                    comptent !</p>
                <div style={{display:"none"}} className="bouncing-text">
                    <div className="b">G</div>
                    <div className="o">A</div>
                    <div className="u">G</div>
                    <div className="n">N</div>
                    <div className="c">E</div>
                    <div className="e">R</div>
                    <div className="shadow"></div>
                    <div className="shadow-two"></div>
                </div>
                <div id={"descriptionPedandex"}>
                    <p style={{fontSize: "50px", textAlign: "center"}} className={"itemDescription"}
                       id={"padandexName"}>{name}</p>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}} id={"textToGuess"}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Pedandex
