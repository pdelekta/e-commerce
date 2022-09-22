import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuOpen, toggleCartOpen } from "./features/header/headerSlice";

export const priceFormatter = price => {
    if (price === 0) return "$0.00";
    if (price) return `$${price.toFixed(2)}`;
};

export const discountGenerator = (regularPrice, discountedPrice) => {
    const discount = Math.ceil(100 - (discountedPrice / regularPrice) * 100);
    return `-${discount}%`;
};

export const getShortenedName = (name, length) => {
    return `${name.substring(0, length)}...`;
};

export const JSONNumbersParser = object => {
    const newObject = Array.isArray(object) ? [...object] : { ...object };
    for (const property in newObject) {
        if (typeof newObject[property] === "string" && parseInt(newObject[property])) {
            newObject[property] = parseInt(newObject[property]);
        }

        if (typeof newObject[property] === "object" && Array.isArray(newObject[property]) === false) {
            newObject[property] = { ...JSONNumbersParser(newObject[property]) };
        }

        if (typeof newObject[property] === "object" && Array.isArray(newObject[property])) {
            newObject[property] = [...JSONNumbersParser(newObject[property])];
        }
    }
    return newObject;
};

export const useResetHeaderModals = (dependency = "") => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMenuOpen(false));
        dispatch(toggleCartOpen(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency]);
};
