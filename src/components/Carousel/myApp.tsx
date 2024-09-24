import React from "react";
import Carousel from "./components/Carousel";
import CarouselItemContainer from "./components/CarouselItemContainer";
import CarouselActions from "./components/CarouselActions";
import CarouselIndicators from "./components/CarouselIndicators";
import styles from "./myApp.module.css";

function MyApp() {
  return (
    <div>
      <Carousel>
        <CarouselItemContainer>
          <img
            className={styles.image}
            src="https://splidejs.com/images/slides/image-slider/01.jpg"
          />
          <img
            className={styles.image}
            src="https://splidejs.com/images/slides/image-slider/02.jpg"
          />
          <img
            className={styles.image}
            src="https://splidejs.com/images/slides/image-slider/03.jpg"
          />
        </CarouselItemContainer>
        <CarouselActions />
        <CarouselIndicators />
      </Carousel>
    </div>
  );
}

export default MyApp;
