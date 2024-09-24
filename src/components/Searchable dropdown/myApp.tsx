import React from "react";
import styles from "./myApp.module.css";
import { Country, getCountries } from "./data";

function MyApp() {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(
    []
  );
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    getCountries().then((data) => setCountries(data));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function filterCountries(e: React.ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value.toLowerCase();
    if (!searchText.length) {
      setFilteredCountries([]);
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(searchText)
        )
      );
    }
  }

  function debounce(fn: Function, timeout: number) {
    let timer: number;
    return function (...args: any[]) {
      if (timer) {
        clearTimeout(timer);
      }
      // window.setTimeout used so that 'number' type can be used
      timer = window.setTimeout(() => fn(...args), timeout);
    };
  }

  const debouncedFilterCountries = debounce(filterCountries, 500);

  function selectCountry(country: Country) {
    if (inputRef.current) {
      setSelectedCountry(country);
      inputRef.current.value = country.name;
      setFilteredCountries([]);
    }
  }

  return (
    <div className={styles.container}>
      <label>Select country</label>
      <input
        className={styles.input}
        placeholder="Type country here.."
        ref={inputRef}
        onChange={debouncedFilterCountries}
      />
      {!!filteredCountries.length && (
        <ul className={styles.listContainer}>
          {filteredCountries.map((country) => (
            <li
              key={country.name}
              className={styles.listItem}
              onClick={() => selectCountry(country)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div
          className={styles.selected}
        >{`Capital: ${selectedCountry.capital}`}</div>
      )}
    </div>
  );
}

export default MyApp;
