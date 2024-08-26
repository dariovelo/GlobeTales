import { countries } from "countries-list";

const europeCountryList = Object.keys(countries)
  .filter((countryCode) => countries[countryCode].continent === "EU") // Filter for European countries
  .reduce((acc, countryCode) => {
    acc[countryCode] = countries[countryCode].name; // Set country code as key and country name as value
    return acc;
  }, {});

const europeCountries = {
  europeCountryList,
};

export default europeCountries;
