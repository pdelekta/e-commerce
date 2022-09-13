import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Women() {
    useResetHeaderModals();
    return (
        <main className="main-container main-container--flex-row | flex">
            <CategoryPage header="Women" categoryName="women" />
        </main>
    );
}
