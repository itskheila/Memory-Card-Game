import react from "react";
import {Routes, Route} from "react-router-dom";
import "./styles/App.css";
import GameBoard from "./components/GameBoard";

function App(){
    return (
        <div className="App">
            <h1>Memory Card Game</h1>
            <GameBoard />

            <Routes>
                
            </Routes>
           
        </div>
    );
}

export default App;
