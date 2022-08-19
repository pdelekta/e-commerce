import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProductImages } from "../../../features/products/productsSlice";
import { ReactComponent as PrevIcon } from "../../../images/icon-previous.svg";
import { ReactComponent as NextIcon } from "../../../images/icon-next.svg";
import Lightbox from "./lightbox/Lightbox";

export default function Gallery({ productId, skeleton }) {
    const images = useSelector(state => selectProductImages(state, productId)) || [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ];

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        setSelectedImageIndex(0);
    }, [productId]);

    const handleOpenOnClick = () => {
        if (window.innerWidth > 416) setIsLightboxOpen(true);
    };

    const handleCloseOnClick = () => {
        setIsLightboxOpen(false);
    };

    const handleCloseOnOutsideClick = event => {
        event.stopPropagation();
        if (event.target.nodeName === "DIALOG" || event.target.classList.contains("lightbox-wrapper"))
            setIsLightboxOpen(false);
    };

    const handleCloseOnKeyDown = event => {
        if (event.keyCode === 27) {
            event.preventDefault();
            setIsLightboxOpen(false);
        }
        if (event.keyCode === 39) handleImageButtons("increment");
        if (event.keyCode === 37) handleImageButtons("decrement");
    };

    const handleSelectImage = index => {
        setSelectedImageIndex(index);
    };

    const handleImageButtons = type => {
        if (type === "increment") {
            if (selectedImageIndex === images.length - 1) return;
            setSelectedImageIndex(prevState => prevState + 1);
        }
        if (type === "decrement") {
            if (selectedImageIndex === 0) return;
            setSelectedImageIndex(prevState => prevState - 1);
        }
    };
    const thumbnailElements = images.map((image, index = 0) => {
        return (
            <div
                key={image?.id}
                className={`gallery__thumbnails__item-wrapper | ${
                    selectedImageIndex === index && !skeleton ? "active" : ""
                } ${skeleton ? "skeleton" : undefined}`}
            >
                {!skeleton && (
                    <img
                        key={image.fullResolution}
                        src={image.thumbnail}
                        className={"gallery__thumbnails__item"}
                        alt={`product-thumbnail-${index + 1}`}
                        onClick={() => handleSelectImage(index)}
                    ></img>
                )}
            </div>
        );
    });

    return (
        <section className="gallery | flex">
            <div className={`gallery__main-photo-wrapper | ${skeleton ? "skeleton" : ""}`}>
                {!skeleton && (
                    <img
                        src={images[selectedImageIndex].fullResolution}
                        className={"gallery__main-photo"}
                        alt="product"
                        onClick={handleOpenOnClick}
                    />
                )}
                {selectedImageIndex > 0 && !skeleton && (
                    <button className="prev-button" onClick={() => handleImageButtons("decrement")}>
                        <PrevIcon className="prev-button__icon" />
                    </button>
                )}
                {selectedImageIndex < images.length - 1 && !skeleton && (
                    <button className="next-button" onClick={() => handleImageButtons("increment")}>
                        <NextIcon className="next-button__icon" />
                    </button>
                )}
            </div>
            {<div className="gallery__thumbnails">{thumbnailElements}</div>}
            <Lightbox
                handleImageButtons={handleImageButtons}
                handleSelectImage={handleSelectImage}
                handleCloseOnClick={handleCloseOnClick}
                handleCloseOnOutsideClick={handleCloseOnOutsideClick}
                handleCloseOnKeyDown={handleCloseOnKeyDown}
                images={images}
                selectedImageIndex={selectedImageIndex}
                open={isLightboxOpen}
                isLoading={skeleton}
            />
        </section>
    );
}
