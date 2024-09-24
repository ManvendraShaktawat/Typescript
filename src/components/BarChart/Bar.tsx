import React from "react";
import styles from "./myApp.module.css";
import Popup from "./Popup";
import { ChartData } from "./data";

export type Coordinates = {
  clientX: number;
  clientY: number;
};

function Bar({ bar, maxHeight }: { bar: ChartData; maxHeight: number }) {
  const [coordinates, setCoordinates] = React.useState<Coordinates | null>(
    null
  );
  const heightPercent = (bar.ticketCount / maxHeight) * 100;

  function getCoordinates(e: React.MouseEvent<HTMLLIElement>) {
    setCoordinates({ clientX: e.clientX, clientY: e.clientY });
  }

  return (
    <li
      className={styles.bar}
      style={{
        height: `${heightPercent}%`,
        backgroundColor: bar.color,
      }}
      onMouseMove={getCoordinates}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const text = e.dataTransfer.getData("text");
        console.log(`Dropped ${text} on ${bar.name} column`);
      }}
    >
      <Popup bar={bar} coordinates={coordinates} />
    </li>
  );
}

export default Bar;
