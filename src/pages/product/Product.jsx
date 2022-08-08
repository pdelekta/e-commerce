import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    selectIsProductById,
    fetchProductById,
    selectIsProductsLoading,
    selectHasProductsError,
} from "../../features/products/productsSlice";
import ProductDetails from "./productDetails/ProductDetails";
import Gallery from "./gallery/Gallery";
export default function Product() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    let { id } = useParams();
    const productId = parseInt(id);

    const isProductById = useSelector(state => selectIsProductById(state, productId));
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const hasProductsError = useSelector(selectHasProductsError);

    useEffect(() => {
        if (isProductById && !hasProductsError) setError("");
    }, [isProductById, hasProductsError]);

    if (!isProductById && !hasProductsError) {
        const response = dispatch(fetchProductById(productId)).unwrap();
        response.then().catch(error => {
            setError(error.message);
        });
    }

    if (hasProductsError && error) return <p>{error}</p>;

    return hasProductsError && error ? (
        <p>{error}</p>
    ) : (
        <>
            <Gallery productId={productId} skeleton={isProductsLoading} />
            <ProductDetails productId={productId} skeleton={isProductsLoading} />
        </>
    );
}
