import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="Home">
            <h1>Home Container</h1>
            <div>
                <a
                    href="https://vinted-api-backend.herokuapp.com/"
                    target="_blank"
                >
                    Go to backend
                </a>
            </div>
            <div>
                <a
                    href="https://vinted-api-backend.herokuapp.com/offers/"
                    target="_blank"
                >
                    Go to backend offers
                </a>
            </div>
            <Link to={`/offers/`}>Go to offers</Link>
        </div>
    );
};
export default Home;
