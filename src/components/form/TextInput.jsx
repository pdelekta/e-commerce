import { useState } from "react";

const TextInput = ({ name, title, type, errorMessage, ...rest }) => {
    const [isFocused, setisFocused] = useState(false);

    const handleBlur = () => setisFocused(true);

    return (
        <>
            <label className="form-section__text-label | fs-500" htmlFor={name}>
                {title}
            </label>
            <input
                autoComplete="off"
                className="form-section__text-input | fs-500"
                id={name}
                type={type}
                name={name}
                {...rest}
                onBlur={handleBlur}
                focused={isFocused.toString()}
            />
            <span className="form-section__text-input-error | fs-400 text-error">{errorMessage}</span>
        </>
    );
};

export default TextInput;
