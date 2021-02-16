import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

//send key to Stripe API
const stripePromise = loadStripe(
    "pk_test_51ILRIOC07VZW5a1iIHvpLpxNXcunRjmn3Or0CrkK0RjTB9v4DKnNKAFRcFiLon5aIEfQ2sjXGND9mlJ3lIi4oU2g00FUNAm9UH"
);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;
