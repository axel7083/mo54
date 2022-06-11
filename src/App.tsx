import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/routes/Home";
import Basket from "./components/routes/Basket";
import Pieces from "./components/routes/pieces/Pieces";
import Vehicles from "./components/routes/Vehicles";
import {IconContext} from "react-icons";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {fetchVehicles} from "./store/features/vehicles/vehiclesSlice";

const App = () => {

    const dispatch = useAppDispatch();
    const vehicles_data_status = useAppSelector(state => state.vehicles.status)

    useEffect(() => {
        if(vehicles_data_status === 'idle')
            dispatch(fetchVehicles());
    }, [vehicles_data_status, dispatch]);

    return (
        <IconContext.Provider value={{ className: "shared-class", size: "20" }}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cart" element={<Basket/>} />
                    <Route path="/pieces" element={<Pieces/>} />
                    <Route path="/vehicles" element={<Vehicles/>} />
                </Routes>
            </Router>
        </IconContext.Provider>
    )
}

export default App;