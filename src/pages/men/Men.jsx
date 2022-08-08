import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";

export default function Men() {
    const dispatch = useDispatch();

    console.log("render");
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return <p className="fs-600 text-neutral-darker fw-bold">Men</p>;
}
