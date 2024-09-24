import React from "react";
import styles from "./myApp.module.css";
import { ChartData } from "./data";
import { Coordinates } from "./Bar";

function Popup({
  bar,
  coordinates,
}: {
  bar: ChartData;
  coordinates: Coordinates | null;
}) {
  if (!coordinates) return null;
  return (
    <div
      className={styles.popup}
      style={{
        left: (coordinates.clientX || 0) + 15,
        top: coordinates.clientY,
      }}
    >
      {bar.name} ({bar.ticketCount})
    </div>
  );
}

export default Popup;
