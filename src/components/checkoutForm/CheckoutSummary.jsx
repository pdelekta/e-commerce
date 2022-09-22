import { useSelector } from "react-redux";
import CartItem from "../../features/cart/cartItem/CartItem";
import { selectCart } from "../../features/cart/cartSlice";
import { priceFormatter } from "../../utilities";

const CheckoutSummary = ({ costs, totalCost }) => {
    const cart = useSelector(selectCart);
    const cartElements = cart.map(({ product, quantity }) => (
        <CartItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={quantity}
            thumbnail={product.thumbnail}
            nameLength={30}
        />
    ));
    return (
        <>
            <h2 className="fs-550 fw-bold">Your order</h2>
            <ul className="cart-items | flex">{cartElements}</ul>
            <div className="checkout-summary__costs | flex">
                {costs.map(cost => (
                    <div key={cost.name} className="checkout-summary__cost | flex">
                        <span className="checkout-summary__cost-title | fs-500 fw-bold">
                            {cost.name}
                        </span>
                        <span className="checkout-summary__cost-value | fs-500 fw-bold">
                            {priceFormatter(cost.value)}
                        </span>
                    </div>
                ))}
            </div>
            <div className="checkout-summary__total-container | flex">
                <span className="checkout-summary__total-title | fs-550 fw-bold">Total</span>
                <span className="checkout-summary__total-value | fs-550 fw-bold">
                    {priceFormatter(totalCost)}
                </span>
            </div>
        </>
    );
};

export default CheckoutSummary;
