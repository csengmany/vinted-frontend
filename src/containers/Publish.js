import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Publish = ({ userToken }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [isInterested, setIsInterested] = useState(false);

    const [file, setFile] = useState({});

    const history = useHistory();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(userToken);
            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

            const response = await axios.post(
                "https://vinted-api-backend.herokuapp.com/offer/publish",
                //"https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data._id);
            //redirect to offer after click on add
            if (response.data._id) {
                history.push(`/offer/${response.data._id}`);
            }
        } catch (error) {
            console.log("error", error.response.headers);
        }
    };

    return (
        <div className="publish">
            <div>
                <h2>Vends ton article</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="file"
                            onChange={(event) => {
                                setFile(event.target.files[0]);
                            }}
                        />
                        <p>Titre</p>
                        <input
                            type="text"
                            placeholder="ex: Chemise Sézane verte"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                        <p>Décris ton article</p>
                        <input
                            type="text"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            placeholder="porté quelquefois, taille correctement"
                        />
                        <p>Marque</p>
                        <input
                            type="text"
                            value={brand}
                            onChange={(event) => {
                                setBrand(event.target.value);
                            }}
                            placeholder="ex: Zara"
                        />
                        <p>Taille</p>
                        <input
                            type="text"
                            value={size}
                            onChange={(event) => {
                                setSize(event.target.value);
                            }}
                            placeholder="ex: L/40/12"
                        />
                        <p>Couleur</p>
                        <input
                            type="text"
                            value={color}
                            onChange={(event) => {
                                setColor(event.target.value);
                            }}
                            placeholder="ex: Fushia"
                        />
                        <p>État</p>
                        <input
                            type="text"
                            value={condition}
                            onChange={(event) => {
                                setCondition(event.target.value);
                            }}
                            placeholder="ex: Neuf avec étiquette"
                        />
                        <p>Lieu</p>
                        <input
                            type="text"
                            value={city}
                            onChange={(event) => {
                                setCity(event.target.value);
                            }}
                            placeholder="ex: Paris"
                        />
                        <div>
                            <p>Prix</p>
                            <input
                                type="text"
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                                placeholder="ex: 10,00 €"
                            />
                            <input
                                type="checkbox"
                                checked={isInterested}
                                onChange={() => {
                                    setIsInterested(!isInterested);
                                }}
                            />
                            <span>Je suis intéressé(e) par les échanges</span>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Publish;
