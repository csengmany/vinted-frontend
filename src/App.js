import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//Import components
import Header from "./components/Header";
//Import containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";

//Import cookies
import Cookies from "js-cookie";

library.add(faSearch);

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState();

    const setUser = (token) => {
        if (token) {
            // Create a cookie name userToken
            Cookies.set("userToken", token, { expires: 1 }); //expire in one day
            // update userToken
            setUserToken(token);
        } else {
            //delete cookie when user is disconnect
            Cookies.remove("userToken");
            //update
            setUserToken(null);
        }
    };
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
            <Header userToken={userToken} setUser={setUser} />
            <Switch>
                <Route path="/signup">
                    <SignUp userToken={userToken} setUser={setUser} />
                </Route>
                <Route path="/login">
                    <Login userToken={userToken} setUser={setUser} />
                </Route>
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
