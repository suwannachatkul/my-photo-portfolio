import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import imagesLoaded from "imagesloaded";
import styles from "./ImageSlider.module.css";

type Image = {
  src: string;
  alt: string;
};

interface CarouselProps {
  images: Image[];
  setImgLoaded: (isLoaded: boolean) => void;
  startSlideEventHandle?: () => void;
  slidedEventHandle?: () => void;
}

const DivCarousel = (props: CarouselProps) => {
  useEffect(() => {
    imagesLoaded(".carousel-image", () => {
      props.setImgLoaded(true);
    });
  });

  return (
    <Carousel
      bsPrefix="carousel"
      keyboard={true}
      fade
      interval={8000}
      onSlide={props.startSlideEventHandle}
      onSlid={props.slidedEventHandle}
    >
      {props.images.map((image, index) => (
        <Carousel.Item key={index}>
          <div
            className={styles["carousel-image"]}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 60%,  rgba(0, 0, 0, 0.6)), url(${image.src})`,
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default DivCarousel;
