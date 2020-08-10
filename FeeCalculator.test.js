const FeeCalculator = require('./FeeCalculator.js');

const configuration = {
  cashIn: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
  cashOutNatural: {
    percents: 0.3,
    week_limit: { amount: 1000, currency: 'EUR' },
  },
  cashOutJuridical: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
};

const cashInOperations = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: {
      amount: 1000000.0,
      currency: 'EUR',
    },
  },
];

const cashOutJuridicalOperations = [
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
];

// same week cashouts
const cashOutNaturalSame = [
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 1000.0,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
];

// different week cashouts (sunday and monday)
const cashOutNaturalDifferent = [
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 1000.0,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-11',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
];

describe('Fee Calculator', () => {
  let commissionFees;

  beforeEach(() => {
    commissionFees = new FeeCalculator(configuration);
  });

  describe('cash ins', () => {
    test('for cash in 200 should return 0.06', () => {
      expect(commissionFees.getFee(cashInOperations[0])).toBe('0.06');
    });

    test('for cash in 1000000 should return 5.00 (max fee)', () => {
      expect(commissionFees.getFee(cashInOperations[1])).toBe('5.00');
    });
  });

  describe('juridical cash outs', () => {
    test('for juridical cash out 300 should return 0.90', () => {
      expect(commissionFees.getFee(cashOutJuridicalOperations[0])).toBe('0.90');
    });

    test('for juridical cash out 100 should return 0.50 (min fee)', () => {
      expect(commissionFees.getFee(cashOutJuridicalOperations[1])).toBe('0.50');
    });
  });

  describe('natural cash outs', () => {
    test('same week first cashout of 1000 (week limit) should return 0.00, second should return 0.03', () => {
      expect(commissionFees.getAllFees(cashOutNaturalSame)).toEqual(['0.00', '0.30']);
    });

    test('different week cashouts not exceeding 1000 both should return 0.00', () => {
      expect(commissionFees.getAllFees(cashOutNaturalDifferent)).toEqual(['0.00', '0.00']);
    });

    test('first weekly cashOut of 1200 (over 1000), should return 0.60', () => {
      const singleCashOut = { ...cashOutNaturalSame[0] };
      singleCashOut.operation.amount = 1200;
      expect(commissionFees.getFee(singleCashOut)).toBe('0.60');
    });
  });
});
