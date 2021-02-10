import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg";
import Product from "../components/Product";

const Home = ({ data }) => {
    return (
        <div className="Home">
            <div className="home-bg">
                <img src={hero} alt="background vinted" />
            </div>
            <div className="home-txt">
                <span>Prêts à faire du tri dans vos placards ?</span>
                <button>Commencer à vendre</button>
            </div>

            <div className="products">
                {data.offers.map((offer, index) => {
                    console.log(offer._id);
                    return (
                        <Product key={offer._id} offer={offer} id={offer._id} />
                    );
                })}
            </div>

            <Link to={`/offer/`}>Go to offers</Link>
        </div>
    );
};
export default Home;
