import { Link } from "react-router-dom";
import Product from "../components/Product";
import tear from "../assets/images/tear.42d6cec6.svg";

const Home = ({ data, search }) => {
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
                <Link to="/offers?">Toutes les offres</Link>
            </div>
            <div className="products">
                {!search
                    ? data.offers.slice(0, 10).map((offer, index) => {
                          // console.log(offer._id);
                          return (
                              <Product
                                  key={offer._id}
                                  offer={offer}
                                  id={offer._id}
                              />
                          );
                      })
                    : data.offers.map((offer, index) => {
                          if (
                              offer.product_name
                                  .toLowerCase()
                                  .indexOf(search.toLowerCase()) !== -1
                          ) {
                              return (
                                  <Product
                                      key={offer._id}
                                      offer={offer}
                                      id={offer._id}
                                  />
                              );
                          }
                      })}
            </div>
        </div>
    );
};
export default Home;
