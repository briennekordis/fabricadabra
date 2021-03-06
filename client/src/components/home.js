import '../App.css';
import React from "react";
import stashPic from "../images/stash.jpeg";

function Home() {
    return (          
          <body id="home" className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                  <main className="px-3">
                      <h1>Welcome to Fabricadabra</h1>
                      <p className="lead">A magical place to keep a sewist's stash organized</p>
                      <div className="container">
                          <img src={stashPic} id="stashPic"></img>
                      </div>
                  </main>
          </body>
      );
    }
    
    export default Home;
