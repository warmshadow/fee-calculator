const Validator = require('./Validator.js');

const wrongData = [
  {
    date: '2016-01-06',
    user: 1.1,
    user_type: 'bad',
    type: 'cash',
    operation: { amount: '200.0', currency: 'USD' },
  },
  {
    date: '2016-01-05',
    user: 2.2,
    user_type: 'bad',
    type: 'cash',
    operation: { amount: '300.0', currency: 'USD' },
  },
];

const wrongDate = [{ date: '2016/01/06' }];

describe('Validator test', () => {
  test('Should throw error when date format is not YYYY-MM-DD', () => {
    expect(() => Validator.validateDate(wrongDate.date, 0)).toThrow(Error);
  });

  test('Should throw error when user type is not one of VALID_USER_TYPES', () => {
    expect(() => Validator.validateUserType(wrongData[0].user_type, 0)).toThrow(Error);
  });

  test('Should throw error when operation type is not one of VALID_OPERATION_TYPES', () => {
    expect(() => Validator.validateUserType(wrongData[0].type, 0)).toThrow(Error);
  });

  test('Should throw error when operation amount is not a number', () => {
    expect(() => Validator.validateAmount(wrongData[0].operation.amount, 0)).toThrow(Error);
  });

  test('Should throw error when currency is not one of VALID_CURRENCY', () => {
    expect(() => Validator.validateCurrency(wrongData[0].operation.currency, 0)).toThrow(Error);
  });

  test('Should throw error when data is not sorted by date', () => {
    expect(() => Validator.validateSortedByDate(wrongData)).toThrow(Error);
  });

  test('Should throw error when data is missing properties', () => {
    expect(() => Validator.validateInputProperties(wrongData)).toThrow(Error);
  });
});
