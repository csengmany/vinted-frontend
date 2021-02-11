import logo from "../assets/images/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = ({ userToken, setUser }) => {
    return (
        <div className="Header">
            <div>
                <img src={logo} alt="logo vinted" />
            </div>
            <div className="search-container">
                <FontAwesomeIcon icon="search" />
                <input type="text" placeholder="Rechercher des articles" />
            </div>

            {userToken ? (
                <button
                    onClick={() => {
                        setUser(null);
                    }}
                >
                    Se déconnecter
                </button>
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

            <button>Vends tes articles</button>
        </div>
    );
};
export default Header;
