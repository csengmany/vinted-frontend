import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            alert(error.message);
            console.log(error.message);
        }
    };
    return (
        <div className="Login">
            <h2>Se connecter</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
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
            </form>
            <span>
                <Link to={"/signup"}>
                    Tu as déjà un compte ? Connecte-toi !
                </Link>
            </span>
        </div>
    );
};
export default Login;
