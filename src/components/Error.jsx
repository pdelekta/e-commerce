export default function Error({ error: { name, message, stack } }) {
    return (
        <div className="error-container | bg-error flex">
            <h2 className="fw-bold fs-500 text-error">{message}</h2>
            <span className="fs-400 text-neutral-darker">{stack}</span>
        </div>
    );
}
