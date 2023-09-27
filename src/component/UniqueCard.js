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
    const [glow, setGlow] = React.useState(null);
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
        fetch("https://api.pokemontcg.io/v2/cards/"+props.cardId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPkm(result);
                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.dexId[0])
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
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    useEffect(() => {
        if(pkm !== null){
            if(pkm.data.rarity == "Ultra Rare"  || pkm.data.rarity == "Trainer Gallery Rare Holo"  || pkm.data.rarity == "Special Illustration"  || pkm.data.rarity == "Special Illustration Rare"  || pkm.data.rarity == "Rare BREAK" || pkm.data.rarity == "Illustration Rare" || pkm.data.rarity == "Hyper Rare"  || pkm.data.rarity == "LEGEND" || pkm.data.rarity == "Promo" || pkm.data.rarity == "Rare Holo GX" || pkm.data.rarity == "Rare Holo V" || pkm.data.rarity == "Rare Holo VMAX" || pkm.data.rarity == "Rare Rainbow" || pkm.data.rarity == "Rare Secret" || pkm.data.rarity == "Rare Shiny GX" || pkm.data.rarity == "Rare Ultra"){
                setGlow("bigImageRainbow")
            }else if(pkm.data.rarity == "Classic Collection"  || pkm.data.rarity == "Promo"  || pkm.data.rarity == "Radiant Rare"  || pkm.data.rarity == "Double Rare"  || pkm.data.rarity == "Amazing Rare" || pkm.data.rarity == "Promo" || pkm.data.rarity == "Rare ACE" || pkm.data.rarity == "Rare Holo" || pkm.data.rarity == "Rare Holo Star" || pkm.data.rarity == "Rare Holo LV.X" || pkm.data.rarity == "Rare Holo" || pkm.data.rarity == "Rare Holo EX" || pkm.data.rarity == "Rare Prime" || pkm.data.rarity == "Rare Prism Star" || pkm.data.rarity == "Rare Shining" || pkm.data.rarity == "Rare Shiny"){
                setGlow("bigImageGold")
            }else{
                setGlow("bigImageRare")
            }
        }
    }, [pkm]);
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+".png";
    }
        return (
            <>
                { pkm &&
                    pkm.data.supertype == "Pokémon" ?
                    <div className="card">
                        <div className={"wrapper "+glow}>
                            <p className={"nbCardHover"}>{"X "+props.cardNb}</p>
                            <img src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+"_hiresopt.jpg" } onError={errorImage}
                                 className={"cover-image "+glow}/>
                        </div>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pkm.data.dexId[0]+".png"} className="character"/>
                    </div>
                    :
                    <div className="card">
                        <div className={"wrapper "+glow}>
                            <img src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+"_hiresopt.jpg" } onError={errorImage}
                                 className={"cover-image "+glow}/>
                        </div>
                    </div>
                }
            </>
        )
}
export default UniqueCard
