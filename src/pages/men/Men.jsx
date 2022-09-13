import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Men() {
    useResetHeaderModals();
    return (
        <main className="main-container main-container--flex-row | flex">
            <CategoryPage header="Men" categoryName="men" />
        </main>
    );
}
