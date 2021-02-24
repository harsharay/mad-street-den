import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Game from "./Components/Game/Game";
import GameResults from "./Components/GameResults/GameResults"
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/signup" component={Signup} exact/>
            <Route path="/game" component={Game} exact/>
            <Route path="/results" component={GameResults} exact/>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
