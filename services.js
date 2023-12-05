const fs = require("fs");
const { convertToFrench } = require("./helpers");
function convertListToFrench(numbers) {
  const frenchNumbers = numbers.map(convertToFrench);
  const result = { input: numbers, output: frenchNumbers };
  const jsonResult = JSON.stringify(result, null, 2);
  fs.writeFileSync("result.json", jsonResult, "utf8");
  return frenchNumbers;
}

exports.convertListToFrench = convertListToFrench;
