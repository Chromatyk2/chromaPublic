 import { BrowserRouter, Route, Routes} from "react-router-dom";
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import BasicExample from './component/nav.js';
import LaderBoard from './component/laderboard.js';
import { Link } from "react-router-dom";
function App() {
  return(
    <>
      <Link to={`/`}>Pokédex</Link>
      <Link to={`/leaderboard`}>Classement</Link>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LaderBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
