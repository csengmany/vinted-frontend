import logo from "../assets/images/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import PriceRange from "../components/PriceRange";

const Header = ({
    userToken,
    setUser,
    search,
    setSearch,
    setRange,
    sortPrice,
    setSortPrice,
}) => {
    const history = useHistory();

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
                        <span>
                            <Link className="header-btn" to={"/signup"}>
                                S'inscrire
                            </Link>
                        </span>
                        <span>
                            <Link className="header-btn" to={"/login"}>
                                Se connecter
                            </Link>
                        </span>
                    </div>
                )}

                <button
                    className="primary-btn"
                    onClick={() => alert("click sur vends tes articles")}
                >
                    Vends tes articles
                </button>
            </div>
        </div>
    );
};
export default Header;
