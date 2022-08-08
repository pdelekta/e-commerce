import { useSelector } from "react-redux";
import { selectCart } from "./cartSlice";
import { selectIsCartOpen } from "../header/headerSlice";
import CartItem from "./cartItem/CartItem";

export default function Cart() {
    const cart = useSelector(selectCart);
    const open = useSelector(selectIsCartOpen) || false;

    const cartElements = cart.map(({ product, quantity }) => (
        <CartItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={quantity}
            thumbnail={product.thumbnail}
        />
    ));

    const cartContent = !cart.length ? (
        <span className="cart-container__empty | fs-500 fw-bold text-neutral-dark">
            Your cart is empty.
        </span>
    ) : (
        <>
            <ul className="cart-items | flex">{cartElements}</ul>
            <button className="btn | flex bg-primary-dark text-white fw-bold">
                Checkout
            </button>
        </>
    );

    return (
        <div
            className="cart-container | flex"
            data-visible={open}
            aria-hidden={!open}
        >
            <div className="cart-container__header | fs-500 fw-bold">Cart</div>
            <div className="cart-container__content | flex">{cartContent}</div>
        </div>
    );
}
