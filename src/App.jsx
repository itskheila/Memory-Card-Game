import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import GameBoard from "./components/GameBoard";
import About from "../src/components/About";
import GameResults from "../src/components/GameResults";
import Navbar from "./components/Navbar";
import './styles/App.css';



function App(){
    return (
        <div className="App">
            <h1>Memory Card Game</h1>
            <GameBoard />
            <Navbar/>

            <Router>
                <Routes>
                    <Route path="/" element={<GameBoard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/results" element={<GameResults />} />
                </Routes>
            </Router>
            
           
        </div>
    );
}

export default App;
