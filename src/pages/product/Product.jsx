import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    selectIsProductById,
    fetchProductById,
    selectIsProductsLoading,
    selectProductsError,
} from "../../features/products/productsSlice";
import { useResetHeaderModals } from "../../utilities";
import ProductDetails from "./productDetails/ProductDetails";
import Gallery from "./gallery/Gallery";
export default function Product() {
    const error = useSelector(selectProductsError);
    const dispatch = useDispatch();
    let { id } = useParams();
    const productId = parseInt(id);
    useResetHeaderModals(productId);

    const isProductById = useSelector(state => selectIsProductById(state, productId));
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const productsError = useSelector(selectProductsError);

    if (!productId) return <Navigate replace to="/product/1" />;

    if (!isProductById && !productsError && !isProductsLoading) {
        dispatch(fetchProductById(productId));
    }

    return productsError && error ? (
        <p>{error}</p>
    ) : (
        <>
            <Gallery productId={productId} skeleton={isProductsLoading} />
            <ProductDetails productId={productId} skeleton={isProductsLoading} />
        </>
    );
}
