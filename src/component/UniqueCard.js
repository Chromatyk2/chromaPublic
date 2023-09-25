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
            right: '-25px'
        },
        image: {
            width:'100%',
            marginTop:'85px'
        }
    };
        return (
            <>
                <div class={"myCardsContainer"}>
                    <img style={customStyles.image} className="fit-picture-card" src={props.cardImage + "/high.webp"}/>
                    <p style={customStyles.content}>X {props.cardNb}</p>
                </div>
            </>
        )
}
export default UniqueCard
