import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Home from "./components/routes/Home";
import {store} from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Basket from "./components/routes/Basket";
import Pieces from "./components/routes/Pieces";
import Vehicles from "./components/routes/Vehicles";
import { IconContext } from "react-icons";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <IconContext.Provider value={{ className: "shared-class", size: "20" }}>
              <Router>
                  <Header/>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/card" element={<Basket/>} />
                      <Route path="/pieces" element={<Pieces/>} />
                      <Route path="/vehicles" element={<Vehicles/>} />
                  </Routes>
              </Router>
          </IconContext.Provider>
      </Provider>
  </React.StrictMode>
);