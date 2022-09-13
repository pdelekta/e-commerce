import { useEffect } from "react";
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
import BreadCrumbs from "../../components/productPage/BreadCrumbs";

export default function Product() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const productId = parseInt(id);
    useResetHeaderModals(productId);

    useEffect(() => {
        if (!isProductById) dispatch(fetchProductById(productId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const product = useSelector(state => selectProduct(state, productId)) || {};
    const isProductById = useSelector(state => selectIsProductById(state, productId));
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const productsError = useSelector(selectProductsError);
    if (!productId) return <Navigate replace to="/product/1" />;

    // if (!isProductById && !productsError && !isProductsLoading) {
    //     dispatch(fetchProductById(productId));
    // }

    return productsError ? (
        <Error error={productsError} />
    ) : (
        <main className="main-container | flex">
            <BreadCrumbs categoryName={product.category} productName={product.name} />
            <div className="product-page-container | flex">
                <Gallery productId={productId} skeleton={isProductsLoading} images={product.images} />
                <ProductDetails productId={productId} product={product} />
            </div>
        </main>
    );
}
