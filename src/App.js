import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
//Import components
import Header from "./components/Header";
//Import containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./components/SignUp";
import Login from "./containers/Login";

//Import cookies
import Cookies from "js-cookie";
import Publish from "./containers/Publish";

library.add(faSearch, faTimesCircle);

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(Cookies.get("userToken") || "");

    //state to set query params to limit number of offers and change the page
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    // state to search an offer by name
    const [search, setSearch] = useState("");
    // state to order price
    const [sortPrice, setSortPrice] = useState(false);
    const [maxPage, setMaxPage] = useState("");
    //state to set range of price
    const [range, setRange] = useState([0, 10000]);
    const [displayModal, setDisplayModal] = useState("");
    const setUser = (token) => {
        if (token) {
            // Create a cookie name userToken
            Cookies.set("userToken", token, { expires: 7 }); //expire in seven days
            // update userToken
            setUserToken(token);
        } else {
            //delete cookie when user is disconnect
            Cookies.remove("userToken");
            //update userToken
            setUserToken(null);
        }
    };
    useEffect(() => {
        //axios request
        const fetchDta = async () => {
            try {
                const response = await axios.get(
                    // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${
                    //     sortPrice ? "price-desc" : "price-asc"
                    // }&priceMin=${range[0]}&priceMax=${
                    //     range[1]
                    // }&page=${page}&limit=${limit}`
                    `https://vinted-api-backend.herokuapp.com/offers?title=${search}&sort=${
                        sortPrice ? "price-desc" : "price-asc"
                    }&priceMin=${range[0]}&priceMax=${
                        range[1]
                    }&page=${page}&limit=${limit}`
                );

                console.log("data", response.data);
                setData(response.data);
                setMaxPage(Math.ceil(response.data.count / limit));

                setIsLoading(false);
                // console.log("offers", data.count);
                // console.log("maxPage", maxPage);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchDta();
    }, [
        search,
        setSearch,
        sortPrice,
        range,
        limit,
        page,
        setMaxPage,
        maxPage,
        data.count,
        setRange,
    ]);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <Router>
            <Header
                userToken={userToken}
                setUser={setUser}
                search={search}
                setSearch={setSearch}
                setRange={setRange}
                sortPrice={sortPrice}
                setSortPrice={setSortPrice}
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
            />
            <div className={`modal ${displayModal}`}>
                <SignUp
                    className="modal-container"
                    setUser={setUser}
                    setDisplayModal={setDisplayModal}
                />
            </div>
            <Switch>
                <Route path="/signup">
                    <SignUp userToken={userToken} setUser={setUser} />
                </Route>
                <Route path="/login">
                    <Login
                        userToken={userToken}
                        setUser={setUser}
                        setDisplayModal={setDisplayModal}
                    />
                </Route>
                <Route path="/offer/:id">
                    <Offer data={data.offers} />
                </Route>
                <Route path="/publish">
                    <Publish userToken={userToken} />
                </Route>

                <Route path="/">
                    <Home
                        data={data}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        maxPage={maxPage}
                        setMaxPage={setMaxPage}
                        userToken={userToken}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
