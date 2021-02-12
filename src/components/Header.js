import logo from "../assets/images/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
const Header = ({ userToken, setUser }) => {
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
                <div className="search-container">
                    <div className="search-icon-div">
                        <FontAwesomeIcon
                            icon="search"
                            className="search-icon"
                        />
                    </div>
                    <input type="text" placeholder="Rechercher des articles" />
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
