import { priceFormatter } from "../../utilities";

const RadioInput = ({ name, required, options, selectedValue, handleChange }) => {
    const paymentLabelClass = name === "payment" ? "form-section__radio-label--payment" : "";
    const optionsElements = options.map(option => (
        <div className="form-section__radio-input-container | flex" key={option.id}>
            <label
                className={`form-section__radio-label ${paymentLabelClass} | flex fs-500 ${
                    selectedValue === option.id ? "active" : ""
                }`}
                htmlFor={option.id}
            >
                <span className="form-section__radio-label-text">
                    {`${option.id} ${option.cost ? `(+ ${priceFormatter(parseInt(option.cost))})` : ""}`}
                </span>
                {option.icon}
            </label>
            <input
                className="form-section__radio-input | fs-500"
                id={option.id}
                value={option.id}
                name={name}
                type="radio"
                checked={option.id === selectedValue}
                onChange={handleChange}
            />
        </div>
    ));
    return <>{optionsElements}</>;
};

export default RadioInput;
