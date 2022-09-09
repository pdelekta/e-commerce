import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    selectIsProductById,
    fetchProductById,
    selectIsProductsLoading,
    selectProductsError,
    selectProduct,
} from "../../features/products/productsSlice";
import { useResetHeaderModals } from "../../utilities";
import ProductDetails from "../../components/productPage/productDetails/ProductDetails";
import Gallery from "../../components/productPage/gallery/Gallery";
import Error from "../../components/Error";

export default function Product() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const productId = parseInt(id);
    useResetHeaderModals(productId);
    const product = useSelector(state => selectProduct(state, productId)) || {};

    const isProductById = useSelector(state => selectIsProductById(state, productId));
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const productsError = useSelector(selectProductsError);
    if (!productId) return <Navigate replace to="/product/1" />;

    if (!isProductById && !productsError && !isProductsLoading) {
        dispatch(fetchProductById(productId));
    }

    return productsError ? (
        <Error error={productsError} />
    ) : (
        <>
            <Gallery productId={productId} skeleton={isProductsLoading} images={product.images} />
            <ProductDetails productId={productId} skeleton={isProductsLoading} product={product} />
        </>
    );
}
