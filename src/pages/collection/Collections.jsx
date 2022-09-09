import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    selectAllProducts,
    selectProductsError,
} from "../../features/products/productsSlice";
import { useResetHeaderModals } from "../../utilities";
import ProductsList from "../../components/productsList/ProductsList";
import Error from "../../components/Error";
export default function Collection() {
    useResetHeaderModals();
    const dispatch = useDispatch();

    const productsError = useSelector(selectProductsError);

    useEffect(() => {
        if (allProducts.length === 0) dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const allProducts = useSelector(selectAllProducts);
    return productsError ? (
        <Error error={productsError} />
    ) : (
        <div className="category-container | flex">
            <h1 className="category-title | fs-600 text-neutral-darker fw-bold">Collections</h1>
            <ProductsList products={allProducts} />
        </div>
    );
}
