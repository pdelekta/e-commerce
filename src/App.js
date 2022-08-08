import { Route, Routes } from "react-router-dom";
import Navbar from "./features/header/Header";
import Product from "./pages/product/Product";
import Collection from "./pages/collection/Collection";
import Men from "./pages/men/Men";
import Women from "./pages/women/Women";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

export default function App() {
    return (
        <>
            <Navbar />
            <main className="main-container | flex">
                <Routes>
                    <Route
                        exact
                        path="/product"
                        element={
                            <>
                                <Product />
                            </>
                        }
                    >
                        <Route
                            path=":id"
                            element={
                                <>
                                    <Product />
                                </>
                            }
                        />
                    </Route>
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    );
}
