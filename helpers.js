const { units, teens, tens, numberRange } = require("./consts");

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

const getRange = (num) => {
  if (num < 0 || num >= 1000000) {
    return numberRange.NEGATIVE_TO_MILLION;
  } else if (num >= 0 && num <= 9) {
    return numberRange.ZERO_TO_NINE;
  } else if (num >= 10 && num <= 16) {
    return numberRange.TEN_TO_SIXTEEN;
  } else if (num >= 17 && num <= 19) {
    return numberRange.SEVENTEEN_TO_NINETEEN;
  } else if (num >= 20 && num <= 69) {
    return numberRange.TWENTY_TO_SIXTY_NINE;
  } else if (num === 70) {
    return numberRange.SEVENTY;
  } else if (num >= 71 && num <= 79) {
    return numberRange.SEVENTY_ONE_TO_SEVENTY_NINE;
  } else if (num === 80) {
    return numberRange.EIGHTY;
  } else if (num >= 81 && num <= 89) {
    return numberRange.EIGHTY_ONE_TO_EIGHTY_NINE;
  } else if (num === 90) {
    return numberRange.NINETY;
  } else if (num >= 91 && num <= 99) {
    return numberRange.NINETY_ONE_TO_NINETY_NINE;
  } else if (num >= 100 && num <= 199) {
    return numberRange.HUNDRED_TO_ONE_NINETY_NINE;
  } else if (num >= 200 && num < 1000) {
    return numberRange.TWO_HUNDRED_TO_NINE_HUNDRED_NINETY_NINE;
  } else if (num >= 1000 && num <= 1999) {
    return numberRange.THOUSAND_TO_ONE_THOUSAND_NINE_HUNDRED_NINETY_NINE;
  } else if (num >= 2000 && num < 10000) {
    return numberRange.TWO_THOUSAND_TO_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE;
  } else if (num >= 10000 && num < 100000) {
    return numberRange.TEN_THOUSAND_TO_NINETY_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE;
  } else if (num >= 100000 && num < 1000000) {
    return numberRange.HUNDRED_THOUSAND_TO_NINE_HUNDRED_NINETY_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE;
  }
};
function convertToFrench(number) {
  const range = getRange(number);

  switch (range) {
    case numberRange.NEGATIVE_TO_MILLION:
      return "Number out of range";
    case numberRange.ZERO_TO_NINE:
      return convertUnits(number);
    case numberRange.TEN_TO_SIXTEEN:
      return convertTeens(number);
    case numberRange.SEVENTEEN_TO_NINETEEN:
      return convertTensAndUnits(10, number);
    case numberRange.TWENTY_TO_SIXTY_NINE:
      return convertTens(number);
    case numberRange.SEVENTY:
      return "soixante-dix";
    case numberRange.SEVENTY_ONE_TO_SEVENTY_NINE:
      return convertSoixante(60, number);
    case numberRange.EIGHTY:
      return "quatre-vingts";
    case numberRange.EIGHTY_ONE_TO_EIGHTY_NINE:
      return convertQuatreVingt(number);
    case numberRange.NINETY:
      return "quatre-vingt-dix";
    case numberRange.NINETY_ONE_TO_NINETY_NINE:
      return convertQuatreVingt(number - 80);
    case numberRange.HUNDRED_TO_ONE_NINETY_NINE:
      return convertHundreds(number);
    case numberRange.TWO_HUNDRED_TO_NINE_HUNDRED_NINETY_NINE:
      return convertHundredsAndUnits(number);
    case numberRange.THOUSAND_TO_ONE_THOUSAND_NINE_HUNDRED_NINETY_NINE:
      return convertThousands(number);
    case numberRange.TWO_THOUSAND_TO_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE:
      return convertThousandsAndUnits(number);
    case numberRange.TEN_THOUSAND_TO_NINETY_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE:
      return convertTenThousands(number);
    case numberRange.HUNDRED_THOUSAND_TO_NINE_HUNDRED_NINETY_NINE_THOUSAND_NINE_HUNDRED_NINETY_NINE:
      return convertHundredThousands(number);
  }
}

exports.convertToFrench = convertToFrench;
