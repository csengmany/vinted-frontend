import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faSearch,
    faTimesCircle,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
//Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "react-loader-spinner";

//Import containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./components/SignUp";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";

//Import cookies
import Cookies from "js-cookie";

library.add(faSearch, faTimesCircle, faPlus);

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
        const fetchData = async () => {
            try {
                const response = await axios.get(
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
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
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
        <div className="loader-container">
            <Loader
                className="loader"
                type="Puff"
                color="#2eb0ba"
                height={100}
                width={100}
            />
        </div>
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
                <Route path="/payment">
                    <Payment />
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
            <Footer />
        </Router>
    );
}

export default App;
