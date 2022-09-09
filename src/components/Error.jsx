export default function Error({ error: { message, name } }) {
    return (
        <div className="error-container | bg-error flex">
            <h2 className="fw-bold fs-500 text-error">{name}</h2>
            <span className="fs-400 text-neutral-darker">{message}</span>
        </div>
    );
}
