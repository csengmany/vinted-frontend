import { useParams } from "react-router-dom";
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
        <div className="offer">
            <div className="offer-container">
                <img
                    src={data.product_image.secure_url}
                    alt={data.product_name}
                />
                <div className="offer-infos">
                    <span>{Number(data.product_price)} €</span>
                    <ul className="offer-details">
                        {data.product_details.map((elem, index) => {
                            const keys = Object.keys(elem);
                            return (
                                <li key={index}>
                                    <div>
                                        <span>{keys[0]}</span>{" "}
                                        <span>{elem[keys[0]]}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="separator"></div>
                    <h3>{data.product_name}</h3>
                    <span>{data.product_description}</span>
                    <div
                        className="offer-owner"
                        onClick={() => alert("Go to user profile")}
                    >
                        {data.owner.account.avatar && (
                            <img
                                src={data.owner.account.avatar.secure_url}
                                alt={`avatar_` + data.owner.account.username}
                            />
                        )}
                        <span>{data.owner.account.username}</span>
                    </div>
                    <button
                        onClick={() => {
                            alert("click sur acheter");
                        }}
                    >
                        Acheter
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Offer;
