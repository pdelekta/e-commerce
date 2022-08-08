export const priceFormatter = price => {
    if (price) return `$${price.toFixed(2)}`;
};

export const discountGenerator = (regularPrice, discountedPrice) => {
    return `-${(100 - (discountedPrice / regularPrice) * 100).toFixed()}%`;
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
