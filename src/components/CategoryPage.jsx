import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    selectProductsByCategory,
    fetchProducts,
    selectProductsError,
} from "../features/products/productsSlice";
import ProductsList from "../components/productsList/ProductsList";
import Error from "../components/Error";

const CategoryPage = ({ header, categoryName }) => {
    const dispatch = useDispatch();
    const productsError = useSelector(selectProductsError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const products = useSelector(state => selectProductsByCategory(state, categoryName)) || [];

    useEffect(() => {
        if (products.length <= 1) dispatch(fetchProducts());
    }, [products, dispatch]);

    return productsError ? (
        <Error error={productsError} />
    ) : (
        <div className="category-container | flex">
            <h1 className="category-title | fs-600 text-neutral-darker fw-bold">{header}</h1>
            <ProductsList products={products} />
        </div>
    );
};

CategoryPage.propTypes = {
    header: PropTypes.string.isRequired,
    categoryName: PropTypes.string,
};

export default CategoryPage;
