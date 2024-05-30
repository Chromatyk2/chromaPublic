import React, {useEffect, useState} from 'react';
import '../App.css'
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    return (
        <>
            <div className={"profilContainer"}>
                <p style={{marginTop:"50px", textAlign:"center",fontSize:"60px",textTransform:"uppercase"}}>{pseudo}</p>
            </div>
        </>
    );
}

export default Profil
