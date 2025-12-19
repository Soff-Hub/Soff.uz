import Lightbox from 'yet-another-react-lightbox';
import { useState } from 'react';
import { IoExpandOutline } from 'react-icons/io5';
import 'yet-another-react-lightbox/styles.css';

function getYouTubeThumbnail(url) {
    const match = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

const ImageLightBox = ({ gallery = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const slidesGallery = Array.isArray(gallery)
        ? gallery.map((image) => ({
              src:
                  image?.image_url ||
                  image?.thumbUrl ||
                  getYouTubeThumbnail(image?.video_url),
          }))
        : [];

    return (
        <div className="m-0">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Rasmlarni to'liq ekranda ko'rish"
                style={{
                    border: 'none',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '5px',
                }}>
                <IoExpandOutline className="fs-1 text-success" />
            </button>

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slidesGallery}
                    render={{
                        slide: ({ slide }) => (
                            <img
                                src={slide.src}
                                alt=""
                                style={{
                                    maxWidth: '100vw',
                                    maxHeight: '100vh',
                                    objectFit: 'contain',
                                    margin: 'auto',
                                    display: 'block',
                                }}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src =
                                        '/static/img/no-document.png';
                                }}
                            />
                        ),
                    }}
                />
            )}
        </div>
    );
};

export default ImageLightBox;
