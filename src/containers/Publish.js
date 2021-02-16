import axios from "axios";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const Publish = ({ userToken }) => {
    const token = Cookies.get("userToken");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [isInterested, setIsInterested] = useState(false);

    const [imageOffer, setImmageOffer] = useState("");
    const [file, setFile] = useState({});

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
        setImmageOffer(URL.createObjectURL(event.target.files[0]));
    };

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
            console.log("data=", response.data);
            console.log("data.url=", response.data.product_image.secure_url);
            console.log("id=", response.data._id);
            //redirect to offer after click on add to publish
            if (response.data._id) {
                history.push(`/offer/${response.data._id}`);
            }
        } catch (error) {
            console.log("error", error.response.headers);
            // console.log(error.response);
        }
    };

    return token ? (
        <div className="publish-container">
            <div className="publish">
                <h2>Vends ton article</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="publish-section">
                            <input type="file" onChange={handleFileChange} />
                            {imageOffer && (
                                <img
                                    src={imageOffer}
                                    alt={title}
                                    style={{
                                        height: "200px",
                                        width: "200px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            )}
                        </div>
                        <div className="publish-section">
                            <div>
                                <h3>Titre</h3>
                                <input
                                    type="text"
                                    placeholder="ex: Chemise Sézane verte"
                                    value={title}
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <h3>Décris ton article</h3>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    placeholder="porté quelquefois, taille correctement"
                                />
                            </div>
                        </div>

                        <div className="publish-section">
                            <div>
                                <h3>Marque</h3>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(event) => {
                                        setBrand(event.target.value);
                                    }}
                                    placeholder="ex: Zara"
                                />
                            </div>
                            <div>
                                <h3>Taille</h3>
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(event) => {
                                        setSize(event.target.value);
                                    }}
                                    placeholder="ex: L/40/12"
                                />
                            </div>
                            <div>
                                <h3>Couleur</h3>
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(event) => {
                                        setColor(event.target.value);
                                    }}
                                    placeholder="ex: Fushia"
                                />
                            </div>
                            <div>
                                <h3>État</h3>
                                <input
                                    type="text"
                                    value={condition}
                                    onChange={(event) => {
                                        setCondition(event.target.value);
                                    }}
                                    placeholder="ex: Neuf avec étiquette"
                                />
                            </div>
                            <div>
                                <h3>Lieu</h3>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                    }}
                                    placeholder="ex: Paris"
                                />
                            </div>
                        </div>

                        <div className="publish-section">
                            <div>
                                <h3>Prix</h3>
                                <div>
                                    <input
                                        className="section-price-input"
                                        type="text"
                                        value={price}
                                        onChange={(event) => {
                                            setPrice(event.target.value);
                                        }}
                                        placeholder="ex: 10,00 €"
                                    />
                                    <label htmlFor="">
                                        <input
                                            type="checkbox"
                                            checked={isInterested}
                                            onChange={() => {
                                                setIsInterested(!isInterested);
                                            }}
                                        />
                                        <span>
                                            Je suis intéressé(e) par les
                                            échanges
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
    );
};

export default Publish;
