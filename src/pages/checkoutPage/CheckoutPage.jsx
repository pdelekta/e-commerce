import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCart, selectCartItemsTotal } from "../../features/cart/cartSlice";
import { useResetHeaderModals } from "../../utilities";
import { ReactComponent as ShippingIcon } from "../../assets/shipping.svg";
import { ReactComponent as StoreIcon } from "../../assets/store.svg";
import { ReactComponent as DebitCardIcon } from "../../assets/debit-card.svg";
import { ReactComponent as MoneyIcon } from "../../assets/money.svg";
import FormSection from "../../components/checkoutForm/FormSection";
import TextInput from "../../components/checkoutForm/TextInput";
import RadioInput from "../../components/checkoutForm/RadioInput";
import CheckoutSummary from "../../components/checkoutForm/CheckoutSummary";

export default function CheckoutPage() {
    useResetHeaderModals();
    const [values, setValues] = useState({
        delivery: { name: "Shipping", cost: 10 },
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phoneNumber: "",
        payment: { name: "Online payment", cost: 0 },
    });

    const isCartEmpty = useSelector(selectCart).length === 0;
    const cartItemsTotal = useSelector(selectCartItemsTotal);

    if (isCartEmpty) return <Navigate replace to="/" />;

    const cashOnDeliveryCost = values.delivery.name === "Shipping" ? 5 : 0;

    const handleChange = ({ target }) => {
        setValues(prevValues => ({ ...prevValues, [target.name]: target.value }));
    };

    const handleChangeDelivery = ({ target }) => {
        setValues(prevValues => ({
            ...prevValues,
            [target.name]: {
                name: target.value,
                cost: target.value === "Shipping" ? 10 : 0,
            },
        }));
    };

    const handleChangePayment = ({ target }) => {
        setValues(prevValues => ({
            ...prevValues,
            [target.name]: {
                name: target.value,
                cost: target.value === "Cash on delivery" ? cashOnDeliveryCost : 0,
            },
        }));
    };

    const deliveryOptions = [
        { id: "Shipping", icon: <ShippingIcon className="form-section__radio-label-icon" />, cost: 10 },
        { id: "Local Pickup", icon: <StoreIcon className="form-section__radio-label-icon" /> },
    ];

    const paymentOptions = [
        {
            id: "Cash on delivery",
            icon: <MoneyIcon className="form-section__radio-label-icon" />,
            cost: cashOnDeliveryCost,
        },
        { id: "Online payment", icon: <DebitCardIcon className="form-section__radio-label-icon" /> },
    ];

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
    const detailsInputsElements = detailsInputs.map(input => {
        if (values.delivery.name === "Local Pickup" && input.name === "address") return false;
        if (values.delivery.name === "Local Pickup" && input.name === "city") return false;
        return (
            <TextInput key={input.name} {...input} value={values[input.name]} onChange={handleChange} />
        );
    });

    return (
        <main className="main-container main-container--checkout | flex">
            <h1 className="checkout-title | fs-600 text-neutral-darker fw-bold">Checkout</h1>
            <div className="checkout-container | flex">
                <section className="form-container | flex">
                    <form className="checkout-form | flex">
                        <FormSection
                            title="Delivery"
                            sectionInputs={
                                <RadioInput
                                    name="delivery"
                                    options={deliveryOptions}
                                    handleChange={handleChangeDelivery}
                                    selectedValue={values.delivery.name}
                                />
                            }
                        />
                        <FormSection
                            title="Payment method"
                            sectionInputs={
                                <RadioInput
                                    name="payment"
                                    options={paymentOptions}
                                    handleChange={handleChangePayment}
                                    selectedValue={values.payment.name}
                                />
                            }
                            column
                        />
                        <FormSection title="Details" sectionInputs={detailsInputsElements} column />
                        <button className="btn btn--add-to-cart | flex bg-primary-dark text-white fw-bold">
                            Order and Pay
                        </button>
                    </form>
                </section>
                <section className="checkout-summary | flex">
                    <CheckoutSummary
                        costs={[
                            { name: "Delivery", value: values.delivery.cost },
                            { name: "Payment", value: values.payment.cost },
                        ]}
                        totalCost={cartItemsTotal + values.delivery.cost + values.payment.cost}
                    />
                </section>
            </div>
        </main>
    );
}
