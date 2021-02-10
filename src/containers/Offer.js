import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Offer = () => {
    const id = useParams();
    console.log(id);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //useEffect to update data une seule fois:  au chargement du composant
    useEffect(() => {
        //axios requet
        const fetchDta = async () => {
            try {
                const response = await axios.get(
                    //`https://lereacteur-vinted-api.herokuapp.com/offer/${id.id}`
                    `https://vinted-api-backend.herokuapp.com/offer/${id.id}`
                );
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchDta();
    }, []);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <div className="Offer">
            <h1>Offer Container</h1>
            <div>{data.product_name}</div>
            <img src={data.product_image.secure_url} alt="" />
            <Link to={"/"}>Go to Home</Link>
        </div>
    );
};
export default Offer;
