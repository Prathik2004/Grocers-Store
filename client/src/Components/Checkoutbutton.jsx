import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R3wwRKxWJHlkcPMlR9K6YlTUqIGOavLJ6HTmcvVxjK5Uaedh2QI51nHpdNqLQUWEqB9Xz6BQp4kWdv24l8mt9dt00C0eOtMBC");

const CheckoutButton = () => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
    };

    return <button onClick={handleCheckout}>Pay Now</button>;
};

export default CheckoutButton;
