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
            <div className="offer-container">
                <img src={data.product_image.secure_url} alt="" />
                <div className="offer-infos">
                    <span>{Number(data.product_price).toFixed(2)} €</span>
                    <div className="offer-details">
                        <div>
                            <span>MARQUE</span>
                            <span>{data.product_details[0].MARQUE}</span>
                        </div>
                        <div>
                            <span>TAILLE</span>
                            <span>{data.product_details[1].TAILLE}</span>
                        </div>
                        <div>
                            <span>ÉTAT</span>
                            <span>{data.product_details[2].ÉTAT}</span>
                        </div>
                        <div>
                            <span>COULEUR</span>
                            <span>{data.product_details[3].COULEUR}</span>
                        </div>
                        <div>
                            <span>EMPLACEMENT</span>
                            <span>{data.product_details[4].EMPLACEMENT}</span>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <h2>{data.product_name}</h2>
                    <span>{data.product_description}</span>
                    <div className="offer-owner">
                        <img
                            src={data.owner.account.avatar.secure_url}
                            alt=""
                        />
                        <span>{data.owner.account.username}</span>
                    </div>
                    <button>Acheter</button>
                </div>
            </div>
            <Link to={"/"}>Go to Home</Link>
        </div>
    );
};
export default Offer;
