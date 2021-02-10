import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg";
const Home = () => {
    return (
        <div className="Home">
            <div className="home-bg">
                <img src={hero} alt="background vinted" />
            </div>
            <div className="home-txt">
                <span>Prêts à faire du tri dans vos placards ?</span>
                <button>Commencer à vendre</button>
            </div>

            <Link to={`/offers/`}>Go to offers</Link>
        </div>
    );
};
export default Home;
