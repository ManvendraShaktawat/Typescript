import React from "react";
import styles from "../myApp.module.css";
import { CarouselContext } from "./Carousel";

function CarouselItemContainer({
  children,
}: {
  children: Array<React.ReactNode>;
}) {
  const context = React.useContext(CarouselContext);

  if (!context) return;

  const { currentItemIndex, setItemCount } = context;

  React.useEffect(() => {
    setItemCount(React.Children.count(children));
  }, []);

  return (
    <div className={styles.carouselItemContainer}>
      {children.at(currentItemIndex)}
    </div>
  );
}

export default CarouselItemContainer;
