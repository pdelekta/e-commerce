import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectProductsByCategory,
    fetchProducts,
    selectProductsError,
} from "../../features/products/productsSlice";
import { useResetHeaderModals } from "../../utilities";
import ProductsList from "../../components/productsList/ProductsList";
import Error from "../../components/Error";
export default function Men() {
    useResetHeaderModals();
    const dispatch = useDispatch();

    const productsError = useSelector(selectProductsError);

    useEffect(() => {
        if (productsByCategory.length === 0) dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const productsByCategory = useSelector(state => selectProductsByCategory(state, "men"));
    return productsError ? (
        <Error error={productsError} />
    ) : (
        <div className="category-container | flex">
            <h1 className="category-title | fs-600 text-neutral-darker fw-bold">Men</h1>
            <ProductsList products={productsByCategory} />
        </div>
    );
}
