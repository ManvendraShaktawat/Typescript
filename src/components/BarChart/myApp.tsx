import React from "react";
import styles from "./myApp.module.css";
import { ChartData, getData } from "./data";
import Bar from "./Bar";

function MyApp() {
  const [defaultSortChartData, setDefaultSortChartData] = React.useState<
    ChartData[]
  >([]);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [maxHeight, setMaxHeight] = React.useState(0);

  React.useEffect(() => {
    getData()
      .then((data) => {
        let max = 0;
        setChartData(data);
        setDefaultSortChartData(data);
        data.forEach((bar) => {
          if (bar.ticketCount > max) {
            max = bar.ticketCount;
          }
        });
        setMaxHeight(max);
      })
      .catch((err: string) => console.log(err));
  }, []);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const sortType = e.target.value;

    if (sortType === "default") {
      setChartData([...defaultSortChartData]);
    } else {
      const newChart = [...chartData];
      setChartData(
        newChart.sort((a, b) => {
          if (sortType === "ascending") {
            return a.ticketCount - b.ticketCount;
          } else {
            return b.ticketCount - a.ticketCount;
          }
        })
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <label htmlFor="sort">Sort</label>
        <select name="sort" onChange={handleSelectChange}>
          <option key="default" value="default">
            Default
          </option>
          <option key="ascending" value="ascending">
            Ascending
          </option>
          <option key="descending" value="descending">
            Descending
          </option>
        </select>
      </div>
      <div
        draggable
        className={styles.drop}
        onDragStart={(e) => e.dataTransfer.setData("text", "mytext")}
      >
        Select and drop me
      </div>
      <ul className={styles.barContainer}>
        {chartData.map((bar) => (
          <Bar key={bar.name} bar={bar} maxHeight={maxHeight} />
        ))}
      </ul>
    </div>
  );
}

export default MyApp;
