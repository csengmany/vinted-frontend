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
    const { name, amount, owner } = location.state;

    return (
        <div className="payment-container">
            <div className="payment">
                <h3>Résumé de la commande</h3>
                <ul>
                    <li>
                        <span>Commande</span> <span>{amount} €</span>
                    </li>
                    <li>
                        <span>Frais de protection acheteurs</span>
                        <span>0.50 €</span>
                    </li>
                    <li>
                        <span>Frais de port</span> <span>1.00 €</span>
                    </li>
                </ul>
                <div className="separator"></div>
                <div className="total">
                    <span>Total</span> <span>{Number(amount) + 1.5} €</span>
                </div>
                <p>
                    Il ne vous reste plus qu'un étape pour vous offrir&nbsp;
                    <strong>{name}</strong>. Vous allez payer&nbsp;
                    <strong>{Number(amount) + 1.5}</strong>€ (frais de
                    protection et frais de port inclus).
                </p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        amount={Number(amount) + 1.5}
                        name={name}
                        owner={owner}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
