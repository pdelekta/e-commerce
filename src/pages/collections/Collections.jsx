import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Collection() {
    useResetHeaderModals();
    return (
        <main className="main-container main-container--flex-row | flex">
            <CategoryPage header="Collections" />
        </main>
    );
}
