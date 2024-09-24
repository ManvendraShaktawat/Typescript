import React from "react";
import styles from "../myApp.module.css";

export type CarouselContextType = {
  currentItemIndex: number;
  setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CarouselContext = React.createContext<CarouselContextType | null>(
  null
);

function Carousel({ children }: { children: React.ReactNode }) {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [itemCount, setItemCount] = React.useState(0);

  return (
    <div className={styles.carousel}>
      <CarouselContext.Provider
        value={{
          currentItemIndex,
          setCurrentItemIndex,
          itemCount,
          setItemCount,
        }}
      >
        {children}
      </CarouselContext.Provider>
    </div>
  );
}

export default Carousel;
