import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./ImageSlider.module.css";

type Imagetype = {
  src: string;
  alt: string;
};

interface CarouselProps {
  images: Imagetype[];
  setImgLoaded: () => void;
  startSlideEventHandle?: () => void;
  slidedEventHandle?: () => void;
}

const DivCarousel = (props: CarouselProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesProps = props.images;

  useEffect(() => {
    let imageList: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkAllImagesLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesProps.length) {
        setImagesLoaded(true);
      }
    };

    imagesProps.forEach((img) => {
      const image = new Image();
      image.onload = checkAllImagesLoaded;
      image.src = img.src;
      imageList.push(image);
    });

  }, [imagesProps]);

  useEffect(() => {
    if (imagesLoaded) {
      props.setImgLoaded();
    }
  }, [imagesLoaded])

  return (
    <Carousel
      bsPrefix="carousel"
      keyboard={true}
      fade
      interval={8000}
      onSlide={props.startSlideEventHandle}
      onSlid={props.slidedEventHandle}
    >
      {imagesProps.map((image, index) => (
        <Carousel.Item key={index}>
          <div
            className={styles["carousel-image"]}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 60%,  rgba(0, 0, 0, 0.5)), url(${image.src})`,
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default DivCarousel;
