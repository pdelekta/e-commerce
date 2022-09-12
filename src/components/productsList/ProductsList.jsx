import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { selectIsProductsLoading } from "../../features/products/productsSlice";
import { priceFormatter, discountGenerator } from "../../utilities";

const ProductsList = ({ products = [] }) => {
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const emptyProducts = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ];
    // debugger;
    const productsElements = products?.map(({ id, name, brand, images: [image], price: [price] }) => {
        return (
            <Link key={id} className="product-card-wrapper" to={`../product/${id}`}>
                <div className="product-card | flex">
                    <div className="product-card__image-wrapper | skeleton">
                        <img className="product-card__image" src={image.fullResolution} alt="product" />
                        {price.beforeDiscount > price.valid && (
                            <span className="discount-label | fs-300 bg-primary-light text-primary-dark fw-bold">
                                {discountGenerator(price.beforeDiscount, price.valid)}
                            </span>
                        )}
                    </div>
                    <span
                        id="product-card-brand"
                        className="product-card__brand | letter-spacing-1 uppercase text-primary-dark fs-300 fw-bold"
                    >
                        {brand}
                    </span>
                    <span className="product-card__name">{name}</span>
                    <div className="product-card__price | flex">
                        <span className="product-card__price-valid | fw-bold">
                            {priceFormatter(price.valid)}
                        </span>
                        {price.beforeDiscount > price.valid && (
                            <span className="product-card__price-beforeDiscount | text-neutral fw-bold fs-300">
                                {priceFormatter(price.beforeDiscount)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        );
    });

    const skeletonElements = emptyProducts.map(product => {
        return (
            <div key={product.id} className="product-card-wrapper">
                <div className="product-card not-to-hover">
                    <div className="product-card__image-wrapper">
                        <div className="product-card__image | skeleton"></div>
                    </div>
                    <div
                        className="skeleton skeleton-line skeleton-line--title"
                        style={{ marginLeft: "1rem" }}
                    ></div>
                    <div
                        className="skeleton skeleton-line skeleton-line--text"
                        style={{ marginLeft: "1rem" }}
                    ></div>
                </div>
            </div>
        );
    });

    return (
        <section className="products-list">
            {isProductsLoading ? skeletonElements : productsElements}
        </section>
    );
};

ProductsList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            brand: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.arrayOf(
                PropTypes.exact({
                    id: PropTypes.number.isRequired,
                    productId: PropTypes.number.isRequired,
                    beforeDiscount: PropTypes.number,
                    valid: PropTypes.number.isRequired,
                })
            ).isRequired,
            images: PropTypes.arrayOf(
                PropTypes.exact({
                    id: PropTypes.number.isRequired,
                    productId: PropTypes.number.isRequired,
                    fullResolution: PropTypes.string.isRequired,
                    thumbnail: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ),
};

export default ProductsList;
