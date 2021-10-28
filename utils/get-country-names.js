import { COUNTRIES } from "./country-codes.js";

export const getCountryNameByIso = (country) => {
  validateIsCountryIso(country);
  let res;
  res = COUNTRIES.find(
    (el) =>
      el.two_letters_code == country.toUpperCase() ||
      el.three_letters_code == country.toUpperCase()
  );
  if (!!res) {
    return res.name;
  }

  throw new Error(
    "Could not find matching country name for ISO code " + country
  );
};

function validateIsCountryIso(country) {
  if (typeof country !== "string") {
    throw new TypeError("Value passed is not a string.");
  }
  if (country.length !== 2 && country.length !== 3) {
    throw new RangeError(
      "Value passed should be either 2 or 3 chracters longs. Value passed: %s",
      country
    );
  }
  return true;
}
