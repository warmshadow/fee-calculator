const {
  roundAndConvert,
  calculatePercentageValue,
  getTaxableAmount,
  getWeekNumber,
} = require('./calculationHelpers.js');

class FeeCalculator {
  constructor({ cashIn, cashOutNatural, cashOutJuridical }) {
    this.cashIn = cashIn;
    this.cashOutJuridical = cashOutJuridical;
    this.cashOutNatural = cashOutNatural;
    this.naturalPersonsWeeklyHistory = {};
  }

  getWeeklyHistory(userId, week) {
    const weeklyHistory = this.naturalPersonsWeeklyHistory;
    const personHistory = weeklyHistory[userId];
    const personWeekHistory = personHistory && personHistory[week];

    return personWeekHistory || 0;
  }

  updateWeeklyHistory(userId, week, amount) {
    const weeklyHistory = this.naturalPersonsWeeklyHistory;
    if (weeklyHistory[userId]) {
      weeklyHistory[userId][week] += amount;
    } else {
      weeklyHistory[userId] = { [week]: amount };
    }
  }

  cashOutNaturalFee(userId, date, amount) {
    const {
      percents,
      week_limit: { amount: weekLimit },
    } = this.cashOutNatural;

    const week = getWeekNumber(date);
    const totalWeeklyHistory = this.getWeeklyHistory(userId, week);
    const exceededAmount = getTaxableAmount(totalWeeklyHistory, amount, weekLimit);

    this.updateWeeklyHistory(userId, week, amount);
    const finalFee = calculatePercentageValue(exceededAmount, percents);

    return finalFee;
  }

  cashOutJuridicalFee(amount) {
    const {
      percents,
      min: { amount: minAmount },
    } = this.cashOutJuridical;

    const baseFee = calculatePercentageValue(amount, percents);
    const finalFee = baseFee < minAmount ? minAmount : baseFee;

    return finalFee;
  }

  cashInFee(amount) {
    const {
      percents,
      max: { amount: maxAmount },
    } = this.cashIn;

    const baseFee = calculatePercentageValue(amount, percents);
    const finalFee = baseFee > maxAmount ? maxAmount : baseFee;

    return finalFee;
  }

  getFee(operation) {
    const {
      user_type: userType,
      type: operationType,
      user_id: userId,
      date,
      operation: { amount },
    } = operation;

    let commissionFee = 0;

    switch (operationType) {
      case 'cash_in': {
        commissionFee = this.cashInFee(amount);
        break;
      }
      case 'cash_out': {
        switch (userType) {
          case 'natural': {
            commissionFee = this.cashOutNaturalFee(userId, date, amount);
            break;
          }
          case 'juridical': {
            commissionFee = this.cashOutJuridicalFee(amount);
            break;
          }
          // no default
        }
        break;
      }
      // no default
    }

    return roundAndConvert(commissionFee);
  }

  getAllFees(operations) {
    const fees = operations.map((operation) => this.getFee(operation));
    return fees;
  }
}

module.exports = FeeCalculator;
