import React, {useEffect, useState} from 'react';
import '../App.css'
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    return (
        <>
            <p>{pseudo}</p>
        </>
    );
}

export default Profil
