import React,{useState, useEffect} from 'react';
import '../App.css'

function UniqueCard(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    let [state, setState] = useState("Initial");
    const customStyles = {
        content: {
            position: 'relative',
            bottom: '107px',
            zIndex: 1,
            fontSize: '100px',
            height: 'inherit',
            right: '-7px'
        },
        image: {
            width:'100%'
        }
    };
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+props.pokemonName.toLowerCase())
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
        return (
            <>
                <div className="card">
                    <div className="wrapper">
                        <img src={props.cardImage + "/high.webp"}
                             className="cover-image"/>
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"
                         className="character"/>
                </div>
                {/*<div class={"myCardsContainer"}>*/}
                {/*    <img style={customStyles.image} className="fit-picture-card" src={props.cardImage + "/high.webp"}/>*/}
                {/*    <p style={customStyles.content}>X {props.cardNb}</p>*/}
                {/*</div>*/}
            </>
        )
}
export default UniqueCard
