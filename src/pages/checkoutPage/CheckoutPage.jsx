import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCart } from "../../features/cart/cartSlice";
import { useResetHeaderModals } from "../../utilities";
import FormSection from "../../components/form/FormSection";
import TextInput from "../../components/form/TextInput";
import RadioInput from "../../components/form/RadioInput";

export default function CheckoutPage() {
    useResetHeaderModals();
    const [values, setValues] = useState({
        delivery: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phoneNumber: "",
    });

    const isCartEmpty = useSelector(selectCart).length === 0;
    if (isCartEmpty) return <Navigate replace to="/" />;

    const handleChange = ({ target }) => {
        setValues(prevValues => ({ ...prevValues, [target.name]: target.value }));
    };

    const deliveryOptions = [{ id: "Shipping" }, { id: "Local Pickup" }];

    const detailsInputs = [
        {
            type: "text",
            name: "firstName",
            title: "First Name",
            errorMessage: "First Name must have 3-16 characters.",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            type: "text",
            name: "lastName",
            title: "Last Name",
            errorMessage: "Last Name must have 3-16 characters.",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            type: "text",
            name: "address",
            title: "Street and house / flat number",
            errorMessage: `Address must be in correct format for example "Street 123."`,
            pattern: "^[a-zA-Z]+\\s[0-9]+$",
            required: true,
        },
        {
            type: "text",
            name: "city",
            title: "City",
            errorMessage: "Type correct city.",
            pattern: "^[a-zA-Z\\s]{3,30}$",
            required: true,
        },
        {
            type: "email",
            name: "email",
            title: "E-mail",
            errorMessage: "E-mail must be in correct format.",
            required: true,
        },
        {
            type: "tel",
            name: "phoneNumber",
            title: "Phone number",
            errorMessage: "Phone number must have minimum 9 digits.",
            pattern: "^[0-9]{9,16}$",
            required: true,
        },
    ];
    const detailsInputsElements = detailsInputs.map(input => (
        <TextInput key={input.name} {...input} value={values[input.name]} onChange={handleChange} />
    ));

    return (
        <main className="main-container main-container--checkout | flex">
            <h1 className="checkout-title | fs-600 text-neutral-darker fw-bold">Checkout</h1>
            <form className="checkout-form | flex">
                <FormSection
                    title="Shipping or pickup"
                    sectionInputs={
                        <RadioInput
                            name="delivery"
                            options={deliveryOptions}
                            handleChange={handleChange}
                            selectedValue={values.delivery}
                        />
                    }
                />
                <FormSection title="Details" sectionInputs={detailsInputsElements} column />
            </form>
        </main>
    );
}
