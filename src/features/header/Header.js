import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCartItemSum } from "../cart/cartSlice";
import { toggleCartOpen, selectIsCartOpen } from "./headerSlice";
import logo from "../../images/logo.svg";
import { ReactComponent as CartIcon } from "../../images/icon-cart.svg";
import { ReactComponent as MenuIcon } from "../../images/icon-menu.svg";
import { ReactComponent as CloseIcon } from "../../images/icon-close.svg";
import avatar from "../../images/image-avatar.png";
import Cart from "../cart/Cart";
export default function Navbar() {
    const dispatch = useDispatch();

    let [isMenuOpen, setIsMenuOpen] = useState(false);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemQuantity = useSelector(selectCartItemSum);

    const mainContainer = document.querySelector(".main-container");
    if (mainContainer)
        mainContainer.style.pointerEvents = isMenuOpen ? "none" : "";

    useEffect(() => {
        const closeModalOnClick = event => {
            event.stopPropagation();
            if (
                isMenuOpen &&
                !event.target.closest(".primary-navigation") &&
                !event.target.closest(".burger")
            ) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("click", closeModalOnClick);
        return () => window.removeEventListener("click", closeModalOnClick);
    }, [isMenuOpen]);

    const handleCartOpen = () => {
        dispatch(toggleCartOpen());
    };
    return (
        <header className="primary-header | flex">
            <MenuIcon className="burger" onClick={() => setIsMenuOpen(true)} />
            <NavLink className="primary-header__logo-container" to="/">
                <img src={logo} alt="logo" />
            </NavLink>
            <nav>
                <ul
                    className="primary-navigation | flex"
                    data-visible={isMenuOpen}
                >
                    <CloseIcon
                        className="close-burger"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <NavLink
                        className="text-neutral-dark | flex fs-500"
                        to="/collection"
                    >
                        <li className="primary-navigation__item">
                            Collections
                        </li>
                    </NavLink>
                    <NavLink
                        className="text-neutral-dark | flex fs-500"
                        to="/men"
                    >
                        <li className="primary-navigation__item">Men</li>
                    </NavLink>
                    <NavLink
                        className="text-neutral-dark | flex fs-500"
                        to="/women"
                    >
                        <li className="primary-navigation__item">Woman</li>
                    </NavLink>
                    <NavLink
                        className="text-neutral-dark | flex fs-500"
                        to="/about"
                    >
                        <li className="primary-navigation__item">About</li>
                    </NavLink>
                    <NavLink
                        className="text-neutral-dark | flex fs-500"
                        to="/contact"
                    >
                        <li className="primary-navigation__item">Contact</li>
                    </NavLink>
                </ul>
            </nav>
            <span
                className={`primary-header__cart ${isCartOpen ? "active" : ""}`}
            >
                <div className="cart-icon-wrapper">
                    <CartIcon alt="cart-icon" onClick={handleCartOpen} />
                    {cartItemQuantity > 0 && (
                        <span className="cart-icon-quantity | fw-bold">
                            {cartItemQuantity}
                        </span>
                    )}
                </div>

                <Cart />
            </span>
            <img className="primary-header__avatar" src={avatar} alt="avatar" />
        </header>
    );
}
