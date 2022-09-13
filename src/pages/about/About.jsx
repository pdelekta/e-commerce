import { useResetHeaderModals } from "../../utilities";

export default function About() {
    useResetHeaderModals();
    return (
        <main className="main-container main-container--flex-row | flex">
            <div className="category-container | flex">
                <h1 className="category-title | fs-600 text-neutral-darker fw-bold">About</h1>
            </div>
        </main>
    );
}
