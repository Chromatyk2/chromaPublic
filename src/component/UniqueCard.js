import React,{useState, useEffect} from 'react';
import '../App.css'

function UniqueCard(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [pkm, setPkm] = React.useState(true);
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
        fetch("https://pokeapi.co/api/v2/pokemon/"+pkm.dexId[0])
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
    }, [pkm]);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/cards/"+props.cardId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPkm(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    console.log(pkm);
        return (
            <>
                {pkm.category == "Pokemon" ?
                    <div className="card">
                        <div className="wrapper">
                            <img src={props.cardImage + "/high.webp"}
                                 className="cover-image"/>
                        </div>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+items.id+".png"}
                             className="character"/>
                    </div>
                    :
                    <div className="card">
                        <div className="wrapper">
                            <img src={props.cardImage + "/high.webp"}
                                 className="cover-image"/>
                        </div>
                    </div>
                }
            </>
        )
}
export default UniqueCard
