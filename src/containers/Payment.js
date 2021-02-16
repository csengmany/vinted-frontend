import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

//send key to Stripe API

const stripePromise = loadStripe(
    "pk_test_51ILRIOC07VZW5a1iIHvpLpxNXcunRjmn3Or0CrkK0RjTB9v4DKnNKAFRcFiLon5aIEfQ2sjXGND9mlJ3lIi4oU2g00FUNAm9UH"
);
console.log("STRIPEPROMISE", stripePromise);

const Payment = () => {
    const location = useLocation();
    console.log("LOCATION", location);
    console.log("state", location.state);
    const { name, amount } = location.state;

    return (
        <div>
            <p>Mon panier</p>
            <p>{name}</p>
            <p>Total à payer : {amount} euros</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={amount} name={name} />
            </Elements>
        </div>
    );
};

export default Payment;
