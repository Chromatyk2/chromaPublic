import React,{useState, useEffect, useRef} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import Modal from "react-modal";
import SpawnPokemonToken from "./spawnPokemonToken";
function Pedandex(props) {
    const [name, setName] = useState(null);
    const [words, setWords] = useState([]);
    const [history, setHistory] = useState([]);
    const [tokens, setTokens] = useState(null);
    const [leaderBoard, setLeaderBoard] = useState(null);
    const [canplay, setCanPlay] = useState(false);
    const [tries, setTries] = useState(0);
    const [dailyGame, setDailyGame] = useState(null);
    const [triesWin, setTriesWin] = useState(0);
    const inputRef = useRef();
    const pseudo = props.cookies.user.data[0].login;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenToken, setIsOpenToken] = React.useState(false);
    const customStyles = {
        content: {
            width:"300px",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    useEffect(() => {
        Axios.get("/api/getCurrentDailyGame/")
            .then(function(response){
                document.getElementById("padandexName").innerText = response.data[0].name.replace(/[^.]/g,'x');
                const name = response.data[0].name;
                setDailyGame(response.data[0]);
                setName(response.data[0].name);
                const description = response.data[0].description;
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
                Axios.get("/api/getMyTokens/"+pseudo)
                    .then(function(answer){
                        if(answer.data.length > 0){
                            setTokens(answer.data[0].token)
                        }
                        Axios.get("/api/getPedandexWin")
                            .then(function(info){
                                setLeaderBoard(info.data)
                                if(info.data.find((uc) => uc.pseudo === pseudo && uc.day === response.data[0].day)){
                                    setCanPlay(false)
                                    setTriesWin(info.data.find((uc) => uc.pseudo === pseudo && uc.day === response.data[0].day).tries)
                                    description.split(" ").forEach(word => {
                                        setWords(words => [...words,word]);
                                        const element = document.createElement("span");
                                        element.setAttribute("id", id);
                                        element.innerText = word.trim();
                                        element.style.background = 'none';
                                        element.style.marginRight = '0';
                                        document.getElementById("winContentId").style.display = 'block'
                                        document.getElementById("padandexName").innerText = name
                                        document.getElementById("padandexName").style.background = 'none'
                                        element.setAttribute("class", "itemDescription");
                                        id++;
                                        div.appendChild(element);
                                    });
                                }else{
                                    setCanPlay(true)
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
                                }
                            })
                    })
            })
    }, []);

    const handleSubmit = (event) => {
        const guess = inputRef.current.value.toString()
        console.log(inputRef.current.value.toString());
        setHistory(history => [...history,guess]);
        setTries(tries + 1);
        words.map((val, key) => {
            if(val.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() == inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()){
                var id = key;
                document.getElementById(id).innerText = val;
                document.getElementById(id).style.background = 'none';
            }
        })
        if(inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() == name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()){
            document.getElementById("winContentId").style.display = 'block'
            document.getElementById("padandexName").innerText = name
            document.getElementById("padandexName").style.background = 'none'
            document.getElementById("inputPedandex").disabled = true;
            document.getElementById("buttonPedandex").disabled = true;
            words.map((val, key) => {
                var id = key;
                document.getElementById(id).innerText = val;
                document.getElementById(id).style.background = 'none';
            })
            if(!leaderBoard.find((uc) => uc.pseudo === pseudo && uc.day === dailyGame.day)){
                Axios.post('/api/addToken',
                    {
                        user: pseudo,
                        win: 1,
                        wins: 1
                    }
                )
                .then(function(response){
                    Axios.post('/api/addPedandexWin',
                        {
                            user: pseudo,
                            tries: tries + 1,
                            day: dailyGame.day,
                            answer: dailyGame.name
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getPedandexWin")
                                .then(function(response) {
                                    setLeaderBoard(response.data)
                                    Axios.get("/api/getMyTokens/"+pseudo)
                                        .then(function(response){
                                            setTokens(response.data[0].token)
                                        })
                                })
                        })
                })
            }
        }
        inputRef.current.value = "";
        event.preventDefault();
    };
    const displayWinContent = (event) => {
        document.getElementById("winContentId").style.display = 'none'
    };
    function openLeaderboard() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function openToken() {
        Axios.get("/api/getMyTokens/"+pseudo)
            .then(function(response){
                if(response.data[0].token > 0){
                    Axios.post('/api/removeToken',
                        {
                            user:pseudo
                        }
                    )
                    .then(function(response){
                        Axios.get("/api/getMyTokens/"+pseudo)
                            .then(function(response){
                                setTokens(response.data[0].token)
                                setIsOpenToken(true);
                            })
                    })
                }
            })
    }
    function closeModalToken() {
        setIsOpenToken(false);
    }
    console.log(history);
    return (
        <>

            <div className={"contentContainer"}>
                <div style={{display:"flex",flexFlow:"row",gap:"20px",justifyContent:"center",flexWrap:"wrap",width:"100%"}}>
                    {leaderBoard &&
                        leaderBoard.length > 0 &&
                        <button className={"openLeaderBoardButton"} onClick={openLeaderboard} style={{backgroundImage: "url(/trophee.webp)"}}></button>
                    }
                    {tokens &&

                        <button className={"openLeaderBoardButton"} onClick={openToken} style={{backgroundImage: "url(/token.png)"}}>
                            <div className="infoPkm">
                                <div className="infoNbBoxSkin">{tokens}</div>
                            </div>
                        </button>
                    }
                </div>
                {canplay === true &&
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                        margin: "20px"
                    }}>
                        <div style={{
                            color: "white",
                            width: "200px",
                            border: "solid",
                            borderRadius: "15px",
                            height: "200px",
                            padding: "10px",
                            overflow: "overlay",
                            scrollbarColor: "#fff transparent",
                            scrollbarWidth: "thin"
                        }}>
                            <p style={{textAlign:"center"}}>Historique</p>
                            <hr />
                            <div style={{
                                display: "flex",
                                flexFlow: "column-reverse"
                            }}>
                                {history.map((val, key) => {
                                    return (
                                        <p>{val}</p>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div>
                            <p style={{color: "white", textAlign: "center"}}>Trouvez le pokémon du jour</p>
                            <p style={{color: "white", textAlign: "center"}}>Nombre d'essais : {tries}</p>
                            <form className={"formPed"} onSubmit={handleSubmit} style={{margin: '20px'}}>
                                <label style={{marginRight: '10px'}}>
                                    <input id={"inputPedandex"} defaultValue={""} type="text" ref={inputRef}
                                           style={{marginLeft: '5px'}}/>
                                </label>
                                <button id={"buttonPedandex"} type="submit"
                                        style={{display: 'block', marginTop: '10px'}}>
                                    Valider
                                </button>
                            </form>
                        </div>
                    </div>
                }
                {canplay === false &&
                    <>
                        <p style={{fontSize: "30px;", color: "white", textAlign: "center"}}>Tu as déjà fini le Pedandex
                            du jour reviens demain !</p>
                    </>
                }
                <div onClick={displayWinContent} id={"winContentId"} style={{display: "none"}}
                     className={"winContent"}>
                    <div className={"winBackground"}></div>
                    <div className="bouncing-text">
                        <div className="b">G</div>
                        <div className="o">A</div>
                        <div className="u">G</div>
                        <div className="n">N</div>
                        <div className="c">E</div>
                        <div className="e">R</div>
                        <div className="shadow"></div>
                        <div className="shadow-two"></div>
                    </div>
                    <p style={{
                        position: "absolute",
                        textAlign: "center",
                        margin: "auto",
                        width: "100%",
                        color: "white"
                    }}>Tu as trouvé en {canplay === true ? tries : triesWin} éssais ! GG, reviens demain !</p>
                </div>
                <div id={"descriptionPedandex"}>
                    <p style={{fontSize: "50px", textAlign: "center"}} className={"itemDescription"} id={"padandexName"}></p>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}} id={"textToGuess"}>
                    </div>
                </div>
            </div>
            <Modal className={"modalLeaderBoard"} isOpen={modalIsOpen} onRequestClose={closeModal}
                   contentLabel="Example Modal">
                <>
                <p style={{textAlign:"center"}}>Classement du jour</p>
                    <table style={{display:"flex",justifyContent:"center"}}>
                        <tbody>
                        {leaderBoard &&
                            leaderBoard.map((val, key) => {
                                return (
                                    <tr style={{justifyContent: "space-between",display:"flex",gap:"50px"}}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{val.pseudo}</td>
                                        <td>{val.tries}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalToken"} isOpen={modalIsOpenToken} onRequestClose={closeModalToken} contentLabel="Example Modal">
                <SpawnPokemonToken pseudo={pseudo}/>
            </Modal>
        </>
);
}

export default Pedandex
