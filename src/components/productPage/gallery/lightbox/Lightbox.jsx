import { ReactComponent as CloseIcon } from "../../../../images/icon-close.svg";
import { ReactComponent as PrevIcon } from "../../../../images/icon-previous.svg";
import { ReactComponent as NextIcon } from "../../../../images/icon-next.svg";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsProductsLoading } from "../../../../features/products/productsSlice";
export default function Lightbox({
    handleImageButtons,
    handleSelectImage,
    handleCloseOnClick,
    handleCloseOnOutsideClick,
    handleCloseOnKeyDown,
    images,
    selectedImageIndex,
    open,
}) {
    const isLoading = useSelector(selectIsProductsLoading);
    const dialog = useRef(null);
    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
            dialog.current?.focus();
        } else if (!open) dialog.current?.close();
    }, [open]);

    if (isLoading === true || Object.keys(images[0]).length === 1) return;

    const thumbnailElements = images.map((image, index) => {
        return (
            <div
                key={image.fullResolution}
                className={`lightbox__thumbnails-item-wrapper ${
                    selectedImageIndex === index ? "active" : ""
                }`}
            >
                <img
                    src={image.thumbnail}
                    className="lightbox__thumbnails-item"
                    alt={`product-thumbnail-${index + 1}`}
                    onClick={() => handleSelectImage(index)}
                ></img>
            </div>
        );
    });

    return (
        <dialog
            tabIndex="-1"
            ref={dialog}
            className="lightbox"
            onKeyDown={handleCloseOnKeyDown}
            onClick={handleCloseOnOutsideClick}
        >
            <div className="lightbox-wrapper | flex">
                <CloseIcon className="lightbox__close | text-white" onClick={handleCloseOnClick} />

                <div className="lightbox__main-photo-wrapper">
                    <img
                        className="lightbox__main-photo"
                        src={images[selectedImageIndex].fullResolution}
                        alt="product"
                    />
                    {selectedImageIndex > 0 && (
                        <button
                            className="prev-button--lightbox"
                            onClick={() => handleImageButtons("decrement")}
                        >
                            <PrevIcon className="prev-button__icon" />
                        </button>
                    )}
                    {selectedImageIndex < images.length - 1 && (
                        <button
                            className="next-button--lightbox"
                            onClick={() => handleImageButtons("increment")}
                        >
                            <NextIcon className="next-button__icon" />
                        </button>
                    )}
                </div>
                <div className="lightbox__thumbnails | flex">{thumbnailElements}</div>
            </div>
        </dialog>
    );
}
