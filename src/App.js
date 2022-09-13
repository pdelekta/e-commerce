import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./features/header/Header";
import Product from "./pages/product/Product";
import Collections from "./pages/collections/Collections";
import Men from "./pages/men/Men";
import Women from "./pages/women/Women";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Navigate replace to="/collections" />} />
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
                <Route path="/collections" element={<Collections />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
