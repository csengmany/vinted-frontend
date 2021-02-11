import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="sign-up">
            <h2>S'inscrire</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value);
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
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    placeholder="Mot de passe"
                />
                <div>
                    <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={() => {
                            setNewsletter(!newsletter);
                        }}
                        className="sign-up-checkbox"
                    />
                    <span>S'inscrire à notre newsletter</span>
                </div>
                <p>
                    En m'inscrivant je confirme avoir lu et accepté les Termes
                    &#38; Conditions et Politique de Confidentialité de Vinted.
                    Je confirme avoir au moins 18 ans.
                </p>
                <button type="submit">S'inscrire </button>
            </form>
            <span>
                <Link to={"/login"}>Tu as déjà un compte ? Connecte-toi !</Link>
            </span>
        </div>
    );
};
export default SignUp;
