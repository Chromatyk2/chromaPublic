import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
            })
    }, [])

        const customStyles = {
            extBar: {
                width: '75%',
                backgroundColor: '#90e5b5',
                position: 'relative',
                zIndex: '-1',
                borderRadius: '50px',
                margin:'auto',
                marginBottom: '15px'
            },
            intBar: {
                width: parseFloat(profil[0].xp/(profil[0].level * 1000) *100).toFixed(2)+"%",
                position: 'relative',
                background: '#0a3a2c',
                textWrap: 'nowrap',
                color: 'white',
                padding: '15px',
                borderRadius: '50px 0 0 50px'
            },
        };
    return (
        <>
            {profil &&
                <div className={"contentContainer"}>
                    <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                    <p className={"pseudoProfil"}>Niveau {profil[0].level}</p>
                    <div style={customStyles.extBar} className="fullProgressBar">
                        <div
                            style={customStyles.intBar}>{profil[0].xp + " / " + profil[0].level * 1000 + "(" + parseFloat(profil[0].xp / (profil[0].level * 1000) * 100).toFixed(2) + "%)"}</div>
                    </div>
                </div>
            }
        </>
    );
}

export default Profil
