import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const [succeeded, setSucceeded] = useState("");
    const handleSubmit = (event) => {
        event.prevenntDefault();
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
