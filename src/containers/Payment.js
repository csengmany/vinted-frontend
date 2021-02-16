import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

//send key to Stripe API
const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
console.log(stripePromise);
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;
