const FormSection = ({ title, sectionInputs, column }) => {
    return (
        <section className="form-section | flex">
            <h2 className="form-section__title | fs-550 fw-bold">{title}</h2>
            <div
                className={`form-section__inputs-container ${
                    column ? "form-section__inputs-container--column" : ""
                } | flex`}
            >
                {sectionInputs}
            </div>
        </section>
    );
};

export default FormSection;
