import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import { IoExpandOutline } from "react-icons/io5";
import "yet-another-react-lightbox/styles.css";

const ImageLightBox = ({ gallery = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const slidesGallery = Array.isArray(gallery)
    ? gallery.map((image) => ({ src: image?.image_url || image?.thumbUrl }))
    : [];

  return (
    <div className="m-0">
      <button type="button" onClick={() => setIsOpen(true)} style={{ border: "none", backgroundColor: "transparent" }}>
        <IoExpandOutline className="fs-1" />
      </button>

      {isOpen && (
        <Lightbox open={isOpen}
          close={() => setIsOpen(false)}
          slides={slidesGallery}

        />
      )}
    </div>
  );
};

export default ImageLightBox;
