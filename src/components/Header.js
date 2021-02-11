import logo from "../assets/images/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="Header">
            <div>
                <img src={logo} alt="logo vinted" />
            </div>
            <div className="search-container">
                <FontAwesomeIcon icon="search" />
                <input type="text" placeholder="Rechercher des articles" />
            </div>

            <div>
                <span>
                    <Link className="header-btn">S'inscrire</Link>
                </span>
                <span>
                    <Link className="header-btn">Se connecter</Link>
                </span>
            </div>

            <button>Vends tes articles</button>
        </div>
    );
};
export default Header;
