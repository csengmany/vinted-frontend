import logo from "../assets/images/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, useLocation } from "react-router-dom";
import PriceRange from "../components/PriceRange";

const Header = ({
    userToken,
    setUser,
    search,
    setSearch,
    setRange,
    sortPrice,
    setSortPrice,
    displayModal,
    setDisplayModal,
}) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className="header-container">
            <div className="header">
                <div>
                    <img
                        src={logo}
                        alt="logo vinted"
                        onClick={() => {
                            history.push("/");
                        }}
                    />
                </div>

                {location.pathname === "/" && (
                    <div className="filter-container">
                        <div className="search-container">
                            <div className="search-icon-div">
                                <FontAwesomeIcon
                                    icon="search"
                                    className="search-icon"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher des articles"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }}
                            />
                        </div>

                        <div className="filter-price">
                            <span>Trier par prix : </span>
                            {/* <span className="checkbox"> */}
                            {/* <input
                                type="checkbox"
                                name="price"
                                onChange={() => {
                                    setSortPrice(!sortPrice);
                                }}
                            /> */}
                            <span
                                className="sort"
                                onClick={() => {
                                    setSortPrice(!sortPrice);
                                }}
                            >
                                {sortPrice ? "⇣" : "⇡"}
                            </span>
                            {/* </span> */}
                            <span>Prix entre :</span>
                            <PriceRange setRange={setRange} />
                        </div>
                    </div>
                )}

                {userToken ? (
                    <div>
                        <button
                            className="red-btn"
                            onClick={() => {
                                setUser(null);
                                history.push("/");
                            }}
                        >
                            Se déconnecter
                        </button>
                    </div>
                ) : (
                    <div>
                        <span
                            style={{
                                color: "#2eb0ba",
                                fontSize: "12px",
                                fontFamily: "Font-med",
                            }}
                            className="header-btn"
                            onClick={() => {
                                setDisplayModal("display");
                            }}
                        >
                            S'inscrire
                        </span>
                        {location.pathname === "/" && (
                            <span>
                                <Link className="header-btn" to={"/login"}>
                                    Se connecter
                                </Link>
                            </span>
                        )}
                    </div>
                )}

                <Link
                    //go to publish if user is connected otherwise go to login
                    to={userToken ? "/publish" : "/login"}
                    className="primary-btn"
                >
                    Vends tes articles
                </Link>
            </div>
        </div>
    );
};
export default Header;
