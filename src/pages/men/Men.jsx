import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Men() {
    useResetHeaderModals();
    return <CategoryPage header="Men" categoryName="men" />;
}
