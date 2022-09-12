/* eslint no-eval: 0 */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import PropTypes from "prop-types";
import { addItem } from "../../../features/cart/cartSlice";
import { toggleCartOpen } from "../../../features/header/headerSlice";
import { selectIsProductsLoading } from "../../../features/products/productsSlice";
import { priceFormatter, discountGenerator } from "../../../utilities";
import { ReactComponent as CartIcon } from "../../../images/icon-cart.svg";
import minusIcon from "../../../images/icon-minus.svg";
import plusIcon from "../../../images/icon-plus.svg";

const ProductDetails = ({ productId, product }) => {
    const dispatch = useDispatch();
    const { brand, name, description, price: [price] = [], images } = product || {};
    const [quantity, setQuantity] = useState(0);
    const skeleton = useSelector(selectIsProductsLoading);

    const handleQuantityChange = typeOfChange => {
        if (quantity === 0 && typeOfChange === "-") return;
        setQuantity(prevQuantity => eval(prevQuantity + typeOfChange + 1));
    };

    useEffect(() => {
        if (quantity > 0) setQuantity(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

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

    return (
        <section className="product-details | flex ">
            <h2
                className={`product-details__brand | letter-spacing-1 uppercase text-primary-dark fs-300 ${
                    skeleton ? "flex" : ""
                }`}
            >
                {!skeleton ? (
                    brand
                ) : (
                    <span className="skeleton skeleton-line skeleton-line--brand"></span>
                )}
            </h2>
            <h1
                style={!skeleton ? {} : { flexDirection: "column" }}
                className={`product-details__title | fs-700 fw-bold text-neutral-darker ${
                    skeleton ? "flex" : ""
                }`}
            >
                {!skeleton ? (
                    name
                ) : (
                    <>
                        <span className="skeleton skeleton-line skeleton-line--title"></span>
                        <span className="skeleton skeleton-line skeleton-line--title"></span>
                    </>
                )}
            </h1>
            <p
                style={!skeleton ? {} : { flexDirection: "column" }}
                className={`product-details__description | fs-400 text-neutral-dark ${
                    skeleton ? "flex" : ""
                }`}
            >
                {!skeleton ? (
                    description
                ) : (
                    <>
                        <span className="skeleton skeleton-line skeleton-line--text"></span>
                        <span className="skeleton skeleton-line skeleton-line--text"></span>
                        <span className="skeleton skeleton-line skeleton-line--text"></span>
                    </>
                )}
            </p>
            {!skeleton && (
                <div className="price-container | flex">
                    <div className="price-container__main-price | flex">
                        <span className="price-container__price | fs-600 fw-bold text-neutral-darker">
                            {priceFormatter(price?.valid)}
                        </span>
                        {price?.beforeDiscount > price?.valid && (
                            <span className="price-container__discount-amount | bg-primary-light text-primary-dark fw-bold">
                                {discountGenerator(price?.beforeDiscount, price?.valid)}
                            </span>
                        )}
                    </div>

                    {price?.beforeDiscount > price?.valid && (
                        <span className="price-container__old-price | text-neutral fw-bold">
                            {priceFormatter(price?.beforeDiscount)}
                        </span>
                    )}
                </div>
            )}
            <div className="product-cta | flex">
                <div className="product-cta__quantity | flex bg-neutral-light">
                    <img
                        src={minusIcon}
                        className={skeleton ? "opacity-0" : null}
                        alt="minus"
                        onClick={() => handleQuantityChange("-")}
                    />
                    <span
                        className={`product-cta__quantity-value fw-bold ${
                            skeleton ? "text-neutral" : "text-neutral-darker"
                        }`}
                    >
                        {!skeleton ? quantity : "0"}
                    </span>
                    <img
                        src={plusIcon}
                        className={skeleton ? "opacity-0" : null}
                        alt="plus"
                        onClick={() => handleQuantityChange("+")}
                    />
                </div>
                <button
                    className="btn btn--add-to-cart | flex bg-primary-dark text-white fw-bold"
                    onClick={handleAddToCart}
                    disabled={skeleton}
                >
                    <CartIcon alt="cart icon" />
                    Add to cart
                </button>
            </div>
        </section>
    );
};

ProductDetails.propTypes = {
    product: PropTypes.exact({
        id: PropTypes.number,
        brand: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.number,
                productId: PropTypes.number,
                beforeDiscount: PropTypes.number,
                valid: PropTypes.number,
            })
        ),
        images: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.number,
                productId: PropTypes.number,
                fullResolution: PropTypes.string,
                thumbnail: PropTypes.string,
            })
        ),
    }),
    productId: PropTypes.number.isRequired,
};

export default ProductDetails;
