const { units, teens, tens } = require("./consts");
function convertToFrench(number) {
  if (number < 0 || number >= 1e12) {
    return "Number out of range";
  }

  if (number >= 0 && number <= 9) {
    return units[number];
  }

  if (number >= 10 && number <= 16) {
    return teens[number - 10];
  }

  if (number >= 17 && number <= 19) {
    return `dix-${units[number - 10]}`;
  }

  if (number >= 20 && number <= 69) {
    const unitPart = number % 10 === 0 ? "" : `-${units[number % 10]}`;

    return number % 10 === 1
      ? `${tens[Math.floor(number / 10)]}-et${unitPart}`
      : `${tens[Math.floor(number / 10)]}${unitPart}`;
  }

  if (number === 70) {
    return "soixante-dix";
  }

  if (number >= 71 && number <= 79) {
    return number % 10 === 1
      ? `soixante-et-${convertToFrench(number - 60)}`
      : `soixante-${convertToFrench(number - 60)}`;
  }

  if (number === 80) {
    return "quatre-vingts";
  }

  if (number >= 81 && number <= 89) {
    return `quatre-vingt-${convertToFrench(number % 10)}`;
  }

  if (number === 90) {
    return "quatre-vingt-dix";
  }

  if (number >= 91 && number <= 99) {
    return `quatre-vingt-${convertToFrench(number - 80)}`;
  }

  if (number >= 100 && number <= 199) {
    const hundredPart =
      number % 100 === 0 ? `cent` : `cent-${convertToFrench(number % 100)}`;
    return hundredPart;
  }

  if (number >= 200 && number < 1000) {
    const cent_suffix = number % 100 == 0 ? "cents" : "cent";
    const hundredPart =
      number % 100 === 0
        ? `${units[Math.floor(number / 100)]}-${cent_suffix}`
        : `${units[Math.floor(number / 100)]}-${cent_suffix}-${convertToFrench(
            number % 100
          )}`;
    return hundredPart;
  }

  if (number >= 1000 && number <= 1999) {
    const thousandPart =
      number % 1000 === 0 ? `mille` : `mille-${convertToFrench(number % 1000)}`;
    return thousandPart;
  }

  if (number >= 2000 && number < 10000) {
    const mille_suffix = number % 100 == 0 ? "milles" : "mille";

    const thousandPart =
      number % 1000 === 0
        ? `${units[Math.floor(number / 1000)]}-${mille_suffix}`
        : `${
            units[Math.floor(number / 1000)]
          }-${mille_suffix}-${convertToFrench(number % 1000)}`;
    return thousandPart;
  }

  if (number >= 10000 && number < 100000) {
    const tenThousandPart =
      number % 1000 === 0
        ? `${teens[Math.floor(number / 1000) - 10]}-milles`
        : `${teens[Math.floor(number / 1000) - 10]}-milles-${convertToFrench(
            number % 1000
          )}`;

    return tenThousandPart;
  }

  if (number >= 100000 && number < 1000000) {
    const tenThousandPart =
      number % 1000 === 0
        ? `${convertToFrench(Math.floor(number / 1000))}-milles`
        : `${convertToFrench(
            Math.floor(number / 1000)
          )}-mille-${convertToFrench(number % 1000)}`;

    return tenThousandPart;
  }
}
function convertListToFrench(numbers) {
  return numbers.map(convertToFrench);
}

exports.convertListToFrench = convertListToFrench;
