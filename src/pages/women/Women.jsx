import CategoryPage from "../../components/CategoryPage";
import { useResetHeaderModals } from "../../utilities";

export default function Women() {
    useResetHeaderModals();
    return <CategoryPage header="Women" categoryName="women" />;
}
