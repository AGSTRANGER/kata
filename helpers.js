const { units, teens, tens } = require("./consts");

function convertUnits(number) {
  return units[number];
}

function convertTeens(number) {
  return teens[number - 10];
}

function convertTensAndUnits(base, number) {
  const unitPart = number % 10 === 0 ? "" : `-${units[number % 10]}`;
  return number % 10 === 1
    ? `${tens[Math.floor(number / base)]}-et${unitPart}`
    : `${tens[Math.floor(number / base)]}${unitPart}`;
}

function convertTens(number) {
  const unitPart = number % 10 === 0 ? "" : `-${units[number % 10]}`;
  return number % 10 === 1
    ? `${tens[Math.floor(number / 10)]}-et${unitPart}`
    : `${tens[Math.floor(number / 10)]}${unitPart}`;
}

function convertSoixante(base, number) {
  return number % 10 === 1
    ? `soixante-et-${convertToFrench(number - base)}`
    : `soixante-${convertToFrench(number - base)}`;
}

function convertQuatreVingt(number) {
  return number % 10 === 1
    ? `quatre-vingt-${convertToFrench(number % 10)}`
    : `quatre-vingt-${convertToFrench(number % 10)}`;
}

function convertHundreds(number) {
  const hundredPart =
    number % 100 === 0 ? `cent` : `cent-${convertToFrench(number % 100)}`;
  return hundredPart;
}

function convertHundredsAndUnits(number) {
  const centSuffix = number % 100 == 0 ? "cents" : "cent";
  const hundredPart =
    number % 100 === 0
      ? `${units[Math.floor(number / 100)]}-${centSuffix}`
      : `${units[Math.floor(number / 100)]}-${centSuffix}-${convertToFrench(
          number % 100
        )}`;
  return hundredPart;
}

function convertThousands(number) {
  const thousandPart =
    number % 1000 === 0 ? `mille` : `mille-${convertToFrench(number % 1000)}`;
  return thousandPart;
}

function convertThousandsAndUnits(number) {
  const milleSuffix = number % 100 == 0 ? "milles" : "mille";
  const thousandPart =
    number % 1000 === 0
      ? `${units[Math.floor(number / 1000)]}-${milleSuffix}`
      : `${units[Math.floor(number / 1000)]}-${milleSuffix}-${convertToFrench(
          number % 1000
        )}`;
  return thousandPart;
}

function convertTenThousands(number) {
  const tenThousandPart =
    number % 1000 === 0
      ? `${teens[Math.floor(number / 1000) - 10]}-milles`
      : `${teens[Math.floor(number / 1000) - 10]}-milles-${convertToFrench(
          number % 1000
        )}`;
  return tenThousandPart;
}

function convertHundredThousands(number) {
  const tenThousandPart =
    number % 1000 === 0
      ? `${convertToFrench(Math.floor(number / 1000))}-milles`
      : `${convertToFrench(Math.floor(number / 1000))}-mille-${convertToFrench(
          number % 1000
        )}`;
  return tenThousandPart;
}
function convertToFrench(number) {
  if (number < 0 || number >= 1000000) {
    return "Number out of range";
  }

  if (number >= 0 && number <= 9) {
    return convertUnits(number);
  }

  if (number >= 10 && number <= 16) {
    return convertTeens(number);
  }

  if (number >= 17 && number <= 19) {
    return convertTensAndUnits(10, number);
  }

  if (number >= 20 && number <= 69) {
    return convertTens(number);
  }

  if (number === 70) {
    return "soixante-dix";
  }

  if (number >= 71 && number <= 79) {
    return convertSoixante(60, number);
  }

  if (number === 80) {
    return "quatre-vingts";
  }

  if (number >= 81 && number <= 89) {
    return convertQuatreVingt(number);
  }

  if (number === 90) {
    return "quatre-vingt-dix";
  }

  if (number >= 91 && number <= 99) {
    return convertQuatreVingt(number - 80);
  }

  if (number >= 100 && number <= 199) {
    return convertHundreds(number);
  }

  if (number >= 200 && number < 1000) {
    return convertHundredsAndUnits(number);
  }

  if (number >= 1000 && number <= 1999) {
    return convertThousands(number);
  }

  if (number >= 2000 && number < 10000) {
    return convertThousandsAndUnits(number);
  }

  if (number >= 10000 && number < 100000) {
    return convertTenThousands(number);
  }

  if (number >= 100000 && number < 1000000) {
    return convertHundredThousands(number);
  }
}

exports.convertToFrench = convertToFrench;
