import { useResetHeaderModals } from "../../utilities";
import ProductsList from "../../components/productsList/ProductsList";
export default function Woman() {
    useResetHeaderModals();
    return (
        <div className="category-container | flex">
            <h1 className="category-title | fs-600 text-neutral-darker fw-bold">Women</h1>
            <ProductsList />
        </div>
    );
}
