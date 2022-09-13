import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsProductsLoading } from "../../features/products/productsSlice";

const BreadCrumbs = ({ categoryName, productName }) => {
    const isProductsLoading = useSelector(selectIsProductsLoading);

    const skeletonBreadCrumbs = <div className="skeleton skeleton-breadcrumbs"></div>;

    const BreadCrumbs = (
        <div className="breadcrumbs__container fs-400 text-neutral">
            <Link className="text-neutral" to="/">
                Sneakers
            </Link>
            <span>-</span>
            <Link className="text-neutral" to={`/${categoryName}`}>
                {categoryName}
            </Link>
            <span>-</span>
            <span className="text-neutral-dark">{productName}</span>
        </div>
    );

    return isProductsLoading ? skeletonBreadCrumbs : BreadCrumbs;
};

BreadCrumbs.propTypes = {
    categoryName: PropTypes.string,
    productName: PropTypes.string,
};

export default BreadCrumbs;
