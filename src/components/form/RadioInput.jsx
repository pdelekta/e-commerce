const RadioInput = ({ name, options, selectedValue, handleChange }) => {
    const optionsElements = options.map(option => (
        <div className="radio-input__container | flex" key={option.id}>
            <label className="form-section__radio-label | fs-500" htmlFor={option.id}>
                {option.id}
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
