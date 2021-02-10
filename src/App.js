import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
//Import components
import Header from "./components/Header";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //useEffect to update data une seule fois:  au chargement du composant
    useEffect(() => {
        //axios requet
        const fetchDta = async () => {
            try {
                const response = await axios.get(
                    // "https://lereacteur-vinted-api.herokuapp.com/offers"
                    "https://vinted-api-backend.herokuapp.com/offers"
                );
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchDta();
    }, []);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <Router>
            <Header />
            <Switch>
                <Route path="/offer/:id">
                    <Offer data={data.offers} />
                </Route>
                <Route path="/">
                    <Home data={data} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
