import { Link } from "react-router-dom";
import Product from "../components/Product";
import tear from "../assets/images/tear.42d6cec6.svg";

const Home = ({ data }) => {
    return (
        <div className="Home">
            <div className="home-bg">
                <div>
                    <div className="home-txt">
                        <span>Prêts à faire du tri dans vos placards ?</span>
                        <button
                            onClick={() =>
                                alert("click sur commencer à vendre")
                            }
                        >
                            Commencer à vendre
                        </button>
                    </div>
                    <img src={tear} alt="tear" className="home-tear"></img>
                </div>
            </div>
            <div>
                <button>Toutes les offres</button>
            </div>
            <div className="products">
                {data.offers.slice(0, 10).map((offer, index) => {
                    // console.log(offer._id);
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
