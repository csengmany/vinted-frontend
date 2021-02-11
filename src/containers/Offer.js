import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Offer = () => {
    // const  id  = useParams(); //object{id:667898080} et donc il faudra faire un id.id
    const { id } = useParams(); // 667898080
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //useEffect to update data une seule fois:  au chargement du composant
    useEffect(() => {
        //axios requet
        const fetchDta = async () => {
            try {
                const response = await axios.get(
                    //`https://lereacteur-vinted-api.herokuapp.com/offer/${id.id}`
                    `https://vinted-api-backend.herokuapp.com/offer/${id}`
                );
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchDta();
    }, [id]);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <div className="Offer">
            <div className="offer-container">
                <img src={data.product_image.secure_url} alt="" />
                <div className="offer-infos">
                    <span>{Number(data.product_price)} €</span>
                    <div className="offer-details">
                        {data.product_details.map((elem, index) => {
                            const keys = Object.keys(elem);
                            return (
                                <li>
                                    <span>{keys[0]}</span>
                                    <span>{elem[keys[0]]}</span>
                                </li>
                            );
                        })}
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
