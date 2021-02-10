import logo from "../assets/images/logo-vinted.png";
const Header = () => {
    return (
        <div className="Header">
            <div>
                <img src={logo} alt="logo vinted" />
            </div>

            <div>
                <button>S'inscrire</button>
                <button>Se connecter</button>
            </div>

            <button>Vends tes articles</button>
        </div>
    );
};
export default Header;
