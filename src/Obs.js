import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css';
import Guess from './component/guess.js';
import MyNote from './component/myNote.js';
import AllNotes from './component/allNotes.js';
import ViewersNote from './component/viewersNote.js';
import NostalPick from './component/nostalPick.js';
function Obs() {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }
  return(
    <>
      <BrowserRouter>
        {cookies.user !== undefined &&
          <NavBar cookies={cookies} />
        }
        <Routes>
          <Route path="/aNu5YwZ5X75m5j" element={<MyNote cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8ue" element={<AllNotes cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8uf" element={<ViewersNote cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGG" element={<NostalPick cookies={cookies} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Obs;
