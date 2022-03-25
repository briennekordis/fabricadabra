import "./App.css";
import React from "react"
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import AddFabric from "./components/addFabric";
import ViewStash from "./components/viewStash";
import Home from "./components/home";
const UserContext = React.createContext(null);


function App() {

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="main">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/fabrics" element={<ViewStash />} />
                    <Route exact path="/add" element={<AddFabric />} />
                    {/* <Route path="/fabrics/:id" component={Tutorial} /> */}
                </Routes>
            </div>
        </div>



      // <HashRouter>
      //   <div>
      //     <NavBar />
      //     <div className="container" style={{padding: "20px"}}>
      //       <Routes>
      //           <Route path="/createFabric/" element={<AddFabric/>}/>
      //           <Route path="/viewStash/" element={<ViewStash/>}/>
      //       </Routes>
      //     </div>
      //   </div>
      // </HashRouter>
    );
  }

export default App;
