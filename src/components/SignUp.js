import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = ({ setUser, setDisplayModal }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState();
    //Navigate go to homepage
    const history = useHistory();

    //error message
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(
                "https://vinted-api-backend.herokuapp.com/user/signup",
                //"https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                    email: email,
                    username: username,
                    phone: phone,
                    password: password,
                    // avatar: avatar,
                }
            );
            console.log("token", response.data.token);
            if (response.data.token) {
                setErrorMessage("");
                setUser(response.data.token);
                setDisplayModal("");
                setUsername("");
                setEmail("");
                setPhone("");
                setPassword("");
                history.push("/");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            }
            console.log("error", error);
        }
    };

    return (
        <div className="sign-up">
            <span
                className="close"
                onClick={() => {
                    setDisplayModal("");
                    setErrorMessage("");
                }}
            >
                X
            </span>
            <h2>S'inscrire</h2>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    placeholder="Nom d'utilisateur"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value);
                    }}
                    placeholder="Téléphone"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    placeholder="Mot de passe"
                />
                {/* <input
                    type="file"
                    className="avatar"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                        setAvatar(event.target.files);
                    }}
                /> */}
                <div className="sign-up-checkbox">
                    <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={() => {
                            setNewsletter(!newsletter);
                        }}
                    ></input>
                    <span>S'inscrire à notre newsletter</span>
                </div>
                <p>
                    En m'inscrivant je confirme avoir lu et accepté les Termes
                    &#38; Conditions et Politique de Confidentialité de Vinted.
                    Je confirme avoir au moins 18 ans.
                </p>
                {errorMessage && (
                    <span style={{ color: "red", marginTop: "15px" }}>
                        {errorMessage}
                    </span>
                )}
                <button type="submit">S'inscrire </button>
            </form>
            <span>
                <Link
                    to={"/login"}
                    onClick={() => {
                        setDisplayModal("");
                    }}
                >
                    Tu as déjà un compte ? Connecte-toi !
                </Link>
            </span>
        </div>
    );
};
export default SignUp;
