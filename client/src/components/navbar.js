import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand">Fabricadabra</a>
            <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/fabrics"} className="nav-link">My Stash</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/stats"} className="nav-link disabled">Stash Stats</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/projects"} className="nav-link disabled">Project Planner</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/settings"} className="nav-link">Settings</Link>
                    </li>
            </div>
        </nav>
    )
}

export default NavBar;