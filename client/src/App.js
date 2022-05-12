import "./App.css";
import React from "react"
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import Stash from "./components/stash";
import Stats from "./components/stats";
import Home from "./components/home";
import Settings from "./components/settings/settings";

function App() {

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="main">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/fabrics" element={<Stash />} />
                    <Route exact path="/stats" element={<Stats />}/>
                    <Route exact path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
  }

export default App;
