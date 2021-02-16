import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
const CheckoutForm = ({ amount, name }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState("");
    console.log("amount name", amount, name);
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // get bank details entered by user
            const cardElements = elements.getElement(CardElement);
            // console.log("cardElement", cardElement);
            // make a request to the Stripe API to get a token
            const stripeResponse = await stripe.createToken(cardElements, {
                //id of buyer => usertoken
                name: "id l'acheteur",
            });

            // console.log("stripeResponse", stripeResponse); //objet {token{...}}
            //  console.log("stripeResponse.token.id", stripeResponse.token.id); // token tok_1ILXTSC07VZW5a1i9Jbulgv3
            const stripeToken = stripeResponse.token.id;
            //Request to my server to perform the transaction
            console.log("amount name 2", amount, name);
            const response = await axios.post(
                // "http://localhost:3100/payment",
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
                    "Achat réalisé avec succès ! Maintenant, attends que le vendeur t'envoie le colis"
                );
            }
        } catch (error) {
            console.log("ERROR=>", error.message);
        }
    };
    return (
        <div className="checkoutForm">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Acheter</button>
            </form>
            <span>{succeeded}</span>
        </div>
    );
};
export default CheckoutForm;
