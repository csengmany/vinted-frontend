import Product from "../components/Product";
import tear from "../assets/images/tear.42d6cec6.svg";
import { Link } from "react-router-dom";

const Home = ({
    data,
    limit,
    setLimit,
    setPage,
    maxPage,
    setMaxPage,
    userToken,
}) => {
    return (
        <div className="Home">
            <div className="home-bg">
                <div>
                    <div className="home-txt">
                        <span>Prêts à faire du tri dans vos placards ?</span>
                        <button>
                            <Link to={userToken ? "/publish" : "/login"}>
                                Commencer à vendre
                            </Link>
                        </button>
                    </div>
                    <img src={tear} alt="tear" className="home-tear"></img>
                </div>
            </div>

            <form action="">
                Nombre d'articles :&nbsp;
                <select
                    name="limit"
                    id=""
                    defaultValue="10"
                    onChange={(event) => {
                        setLimit(event.target.value);
                        setMaxPage(Math.ceil(data.count / limit));
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </form>
            <span>Page:</span>
            {new Array(maxPage).fill(1).map((item, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setPage(index + 1);
                            console.log(data.count);
                        }}
                    >
                        {index + 1}
                    </button>
                );
            })}
            <div className="products">
                {data.offers.map((offer, index) => {
                    // console.log(offer._id);
                    return <Product key={index} offer={offer} id={offer._id} />;
                })}
            </div>
        </div>
    );
};
export default Home;
