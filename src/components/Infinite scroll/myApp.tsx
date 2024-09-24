import React from "react";
import styles from "./myApp.module.css";
import { Country, getPaginatedCountries } from "./data";

const LIMIT: number = 25;

function MyApp() {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(getCountries, []);

  function getCountries() {
    setIsLoading(true);
    getPaginatedCountries(startIndex, LIMIT).then((data) => {
      const newList = [...countries, ...data.countries];
      setHasMore(data.hasMore);
      setCountries(newList);
      setIsLoading(false);
      setStartIndex(startIndex + LIMIT);
    });
  }

  function handleScroll(e: React.UIEvent<HTMLUListElement>) {
    const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement; // type assertion because e.target could be empty as well
    // Load more items when scroll nears the bottom (90% of the scrollable height)
    const isApproachingBottom = scrollTop + clientHeight >= scrollHeight * 0.9;
    // No API call while loading is in progress or hasMore is false
    if (isApproachingBottom && hasMore && !isLoading) {
      getCountries();
    }
  }

  return (
    <div className={styles.container}>
      <ul className={styles.listContainer} onScroll={handleScroll}>
        {countries.map((country) => (
          <li key={country.name} className={styles.listItem}>
            {country.name}
          </li>
        ))}
        {isLoading && <li className={styles.loader}>------ Loading ------</li>}
      </ul>
    </div>
  );
}

export default MyApp;
