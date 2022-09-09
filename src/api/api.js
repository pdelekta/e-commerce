import { JSONNumbersParser } from "../utilities";

export const fetchAPI = async (urlParameter = "") => {
    const response = await fetch(
        `https://62ecca7855d2bd170e86e852.mockapi.io/api/v1/products/${urlParameter}`
    );
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    const json = await response.json();
    return JSONNumbersParser(json);
};
