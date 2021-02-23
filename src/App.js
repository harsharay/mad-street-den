import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Game from "./Components/Game/Game"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/signup" component={Signup} exact/>
            <Route path="/game" component={Game} exact/>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
