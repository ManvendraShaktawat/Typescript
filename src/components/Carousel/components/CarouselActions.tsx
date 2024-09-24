import React from "react";
import styles from "../myApp.module.css";
import { CarouselContext } from "./Carousel";

const ICON_SRC =
  "https://icons.veryicon.com/png/o/miscellaneous/commonly-used-icon-1/angle-brackets.png";

function CarouselActions() {
  const context = React.useContext(CarouselContext);

  if (!context) return;

  const { currentItemIndex, setCurrentItemIndex, itemCount } = context;

  function handleLeftClick() {
    if (currentItemIndex === 0) {
      setCurrentItemIndex(itemCount - 1);
    } else {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  }

  function handleRightClick() {
    if (currentItemIndex === itemCount - 1) {
      setCurrentItemIndex(0);
    } else {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  }

  return (
    <div className={styles.carouselActions}>
      <img
        className={`${styles.action} ${styles.left}`}
        src={ICON_SRC}
        onClick={handleLeftClick}
      />
      <img
        className={styles.action}
        src={ICON_SRC}
        onClick={handleRightClick}
      />
    </div>
  );
}

export default CarouselActions;
