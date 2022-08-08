/* eslint no-eval: 0 */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { selectProduct } from "../../../features/products/productsSlice";
import { addItem } from "../../../features/cart/cartSlice";
import { toggleCartOpen } from "../../../features/header/headerSlice";
import { priceFormatter, discountGenerator, JSONNumbersParser } from "../../../utilities";
import { ReactComponent as CartIcon } from "../../../images/icon-cart.svg";
import minusIcon from "../../../images/icon-minus.svg";
import plusIcon from "../../../images/icon-plus.svg";

export default function ProductDetails({ productId, skeleton }) {
    const dispatch = useDispatch();

    // const test = {
    //     string1: "string",
    //     obj: {
    //         number2: "10",
    //     },
    //     array1: [{ test2: 12, prop2: { wartosc3: " 10" } }],
    //     number1: "20",
    // };

    // console.log(JSONNumbersParser(test));

    const {
        brand,
        name,
        description,
        price: [price] = [],
        images,
    } = JSONNumbersParser(useSelector(state => selectProduct(state, productId))) || {};

    const [quantity, setQuantity] = useState(0);
    const handleQuantityChange = typeOfChange => {
        if (quantity === 0 && typeOfChange === "-") return;
        setQuantity(prevQuantity => eval(prevQuantity + typeOfChange + 1));
    };

    const handleAddToCart = () => {
        const product = {
            product: {
                id: productId,
                thumbnail: images[0].thumbnail,
                name,
                price: price.valid,
            },
            quantity,
        };

        if (product.quantity > 0) {
            dispatch(addItem(product));
            dispatch(toggleCartOpen(true));
        }
    };

    if (skeleton) return <p>Loading</p>;

    return (
        <section className={`product-details | flex ${skeleton ? "skeleton" : ""}`}>
            <h2 className="product-details__brand | uppercase | text-primary-dark | fs-300">{brand}</h2>
            <h1
                className={`product-details__title | fs-700 fw-bold text-neutral-darker ${
                    skeleton ? "skeleton" : ""
                }`}
            >
                {name}
            </h1>
            <p
                className={`product-details__description | fs-400 text-neutral-dark ${
                    skeleton ? "skeleton" : ""
                }`}
            >
                {description}
            </p>
            <div className="price-container | flex">
                <div className="price-container__main-price | flex">
                    <span className="price-container__price | fs-600 fw-bold text-neutral-darker">
                        {priceFormatter(price.valid)}
                    </span>
                    {price.beforeDiscount > price.valid && !skeleton && (
                        <span className="price-container__discount-amount | bg-primary-light text-primary-dark fw-bold">
                            {discountGenerator(price.beforeDiscount, price.valid)}
                        </span>
                    )}
                </div>
                {price.beforeDiscount > price.valid && !skeleton && (
                    <span className="price-container__old-price | text-neutral fw-bold">
                        {priceFormatter(price.beforeDiscount)}
                    </span>
                )}
            </div>
            <div className="product-cta | flex">
                <div className="product-cta__quantity | flex bg-neutral-light">
                    <img src={minusIcon} alt="minus" onClick={() => handleQuantityChange("-")} />
                    <span className="product-cta__quantity-value text-neutral-darker fw-bold">
                        {quantity}
                    </span>
                    <img src={plusIcon} alt="plus" onClick={() => handleQuantityChange("+")} />
                </div>
                <button
                    className="btn btn--add-to-cart | flex bg-primary-dark text-white fw-bold"
                    onClick={handleAddToCart}
                >
                    <CartIcon alt="cart icon" />
                    Add to cart
                </button>
            </div>
        </section>
    );
}
