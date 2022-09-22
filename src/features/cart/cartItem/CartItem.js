import { useDispatch } from "react-redux";
import { removeItem } from "../cartSlice";
import { priceFormatter, getShortenedName } from "../../../utilities";
import { Link } from "react-router-dom";
import { ReactComponent as IconDelete } from "../../../images/icon-delete.svg";

export default function CartItem({
    id,
    name,
    price,
    quantity,
    thumbnail,
    haveDeleteButton,
    nameLength,
}) {
    const dispatch = useDispatch();

    const handleRemoveItem = id => {
        dispatch(removeItem(id));
    };

    const shortName = getShortenedName(name, nameLength);

    return (
        <li className="cart-item | flex">
            <Link className="cart-item__link | flex" to={`/product/${id}`}>
                <img className="cart-item__image" src={thumbnail} alt="product-thumbnail" />
                <div className="cart-item__text | flex">
                    <span className="cart-item__name | text-neutral-dark">{shortName}</span>
                    <div className="cart-item__prices | flex">
                        <span className="cart-item__base-price | text-neutral-dark">
                            {priceFormatter(price)}
                        </span>
                        <span className="text-black">x</span>
                        <span className="cart-item__quantity | text-neutral-dark">{quantity}</span>
                        <span className="cart-item__sum-price | fw-bold text-neutral-darker">
                            {priceFormatter(price * quantity)}
                        </span>
                    </div>
                </div>
            </Link>
            {haveDeleteButton && (
                <IconDelete className="cart-item__delete" onClick={() => handleRemoveItem(id)} />
            )}
        </li>
    );
}
