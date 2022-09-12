import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Collection() {
    useResetHeaderModals();
    return <CategoryPage header="Collections" />;
}
