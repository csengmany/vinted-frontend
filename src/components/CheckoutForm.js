import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";

const CheckoutForm = ({ amount, name, owner }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const idUser = Cookies.get("userToken");

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            // get bank details entered by user
            const cardElements = elements.getElement(CardElement);

            // make a request to the Stripe API to get a token
            const stripeResponse = await stripe.createToken(cardElements, {
                //id of buyer => usertoken
                name: idUser,
            });

            const stripeToken = stripeResponse.token.id;
            //Request to my server to perform the transaction

            const response = await axios.post(
                "https://vinted-api-backend.herokuapp.com/payment",
                {
                    amount,
                    name,
                    stripeToken,
                }
            );
            console.log("response status", response.status);
            if (response.status === 200) {
                setIsLoading(false);
                setSucceeded(
                    `Achat réalisé avec succès ! Maintenant, attends que ${owner} t'envoie le colis`
                );
            }
        } catch (error) {
            console.log("ERROR=>", error.message);
        }
    };
    return (
        <div className="checkoutForm">
            <form onSubmit={handleSubmit}>
                <CardElement className="cardElement" />
                <button type="submit">Acheter</button>
            </form>
            {isLoading && (
                <div>
                    <Loader
                        className="loader"
                        type="Puff"
                        color="#00c06d"
                        height={20}
                        width={20}
                    />
                </div>
            )}
            <p>{succeeded}</p>
        </div>
    );
};
export default CheckoutForm;
