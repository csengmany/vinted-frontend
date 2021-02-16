import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const userToken = Cookies.get("userToken");
    const [succeeded, setSucceeded] = useState("");
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // get bank details entered by user
            const cardElements = elements.getElement(CardElement);
            // console.log("cardElement", cardElement);
            // make a request to the Stripe API to get a token
            const stripeResponse = await stripe.createToken(cardElements, {
                //id of buyer => usertoken
                name: userToken,
            });
            console.log("stripeResponse", stripeResponse);
            console.log("stripeResponse-id", stripeResponse.token.id);
            const stripeToken = stripeResponse.token.id;
            //Request to my server to perform the transaction
            const response = await axios.post(
                // "https://vinted-api-backend.herokuapp.com/payment" ,
                "https://lereacteur-vinted-api.herokuapp.com/payment",
                {
                    stripeToken: stripeToken,
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
