import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setUser, setDisplayModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(
                "https://vinted-api-backend.herokuapp.com/user/login",
                { email: email, password: password }
            );
            console.log(response);
            if (response.data.token) {
                setUser(response.data.token);
                history.push("/");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage("Something went error, please try again");
            if (error.message) {
                console.log(error.response.message);
            }
        }
    };
    return (
        <div className="login">
            <h2>Se connecter</h2>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button>Se connecter</button>
                <span style={{ color: "red" }}>{errorMessage}</span>
            </form>
            <span
                onClick={() => {
                    setDisplayModal("display");
                }}
            >
                Pas encore de compte ? Inscris-toi !
            </span>
        </div>
    );
};
export default Login;
