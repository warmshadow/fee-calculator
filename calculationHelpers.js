// using currency.js to avoid floating point problems in calculations
const currency = require('currency.js');
const moment = require('moment');

const PRECISION = 3;

/**
 * round cents to upper bound
 * by adding 1 cent if 3rd digit after decimal point is > 0
 * then convert to string and slice off last digit
 */
function roundAndConvert(amount) {
  const initialAmount = currency(amount, { precision: PRECISION });
  const remainder = initialAmount.intValue % 10;
  const increment = remainder > 0 ? 0.01 : 0;
  let finalAmount = currency(initialAmount, { precision: PRECISION }).add(increment).value;
  finalAmount = finalAmount.toFixed(3).slice(0, -1);

  return finalAmount;
}

function calculatePercentageValue(amount, percents) {
  const convertedAmount = currency(amount, { precision: PRECISION });
  const multiplied = convertedAmount.multiply(percents).divide(100);

  return multiplied.value;
}

function getTaxableAmount(previousAmount, newAmount, freeLimit) {
  const totalAmount = previousAmount + newAmount;
  if (previousAmount <= freeLimit) {
    if (totalAmount > freeLimit) {
      return totalAmount - freeLimit;
    }
    return 0;
  }
  return newAmount;
}

/**
 * using isoWeek and isoWeekYear
 * avoids wrong numbers with weeks during new year
 * iso week starts on monday
 */
function getWeekNumber(date) {
  const operationDate = moment(date);
  const operationYear = operationDate.isoWeekYear();
  const operationWeek = operationDate.isoWeek();

  return `${operationYear} - ${operationWeek}`;
}

module.exports = {
  roundAndConvert,
  calculatePercentageValue,
  getTaxableAmount,
  getWeekNumber,
};
