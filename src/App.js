 import { BrowserRouter, Route, Routes} from "react-router-dom";
import $ from "jquery";
import './App.css';
import HomePage from './component/home.js';
import BasicExample from './component/nav.js';

function App() {
  return(
    <>
      // <BasicExample />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
