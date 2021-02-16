import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
const CheckoutForm = ({ amount, name, owner }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState("");
    console.log("amount, name, owner", amount, name, owner);
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // get bank details entered by user
            const cardElements = elements.getElement(CardElement);

            // make a request to the Stripe API to get a token
            const stripeResponse = await stripe.createToken(cardElements, {
                //id of buyer => usertoken
                name: "id l'acheteur",
            });

            const stripeToken = stripeResponse.token.id;
            //Request to my server to perform the transaction

            const response = await axios.post(
                "https://vinted-api-backend.herokuapp.com/payment",
                // "https://lereacteur-vinted-api.herokuapp.com/payment",
                {
                    amount,
                    name,
                    stripeToken,
                }
            );
            console.log("response status", response.status);
            if (response.status === 200) {
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
            <p>{succeeded}</p>
        </div>
    );
};
export default CheckoutForm;
