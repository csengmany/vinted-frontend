import { Link, useParams } from "react-router-dom";

const Offer = () => {
    const id = useParams();
    console.log(id);
    return (
        <div className="Offer">
            <h1>Offer Container</h1>
            <Link to={"/"}>Go to Home</Link>
        </div>
    );
};
export default Offer;
