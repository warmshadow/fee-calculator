const { roundAndConvert, calculatePercentageValue } = require('./calculationHelpers.js');

describe('roundAndConvert method', () => {
  test('Method roundAndConvert is defined', () => expect(roundAndConvert).toBeDefined());

  test('Rounds amount to cents (upper bound) and converts to string', () => {
    // [input, output]
    const randomNumbers = [
      [0.468854, '0.47'],
      [0.486542, '0.49'],
      [0.655075, '0.66'],
      [1.09484, '1.10'],
      [1.294639, '1.30'],
      [1.357692, '1.36'],
      [1.382499, '1.39'],
      [2.005412, '2.01'],
      [2.137926, '2.14'],
      [2.367433, '2.37'],
      [2.439647, '2.44'],
      [2.658686, '2.66'],
      [2.705759, '2.71'],
      [2.837466, '2.84'],
      [2.939284, '2.94'],
      [1.1, '1.10'],
      [1.1053, '1.11'],
      [2.201, '2.21'],
      [2.20001, '2.20'],
      [0.023, '0.03'],
      [3.5249508165, '3.53'],
      [9.8128513218, '9.82'],
      [93.7333579877, '93.74'],
      [29.8522797976, '29.86'],
      [45.0066585927, '45.01'],
      [68.8221959052, '68.83'],
      [97.3387785989, '97.34'],
      [67.2900728235, '67.29'],
      [45.1496462459, '45.15'],
      [286.30753, '286.31'],
      [1758.75942, '1758.76'],
      [1956.3194, '1956.32'],
      [2018.53633, '2018.54'],
      [2541.708, '2541.71'],
      [147948223.054511, '147948223.06'],
      [163789012411.1053, '163789012411.11'],
      [9007199254749.9134, '9007199254749.92'],
    ];

    randomNumbers.map(([input, output]) => expect(roundAndConvert(input)).toBe(output));
  });
});

describe('calculatePercentageValue method', () => {
  test('Method calculatePercentageValue is defined', () => {
    expect(calculatePercentageValue).toBeDefined();
  });

  test('Calculate percentage value with precision 3 after decimal point', () => {
    // [number, percents, output]
    const randomNumbers = [
      [10.29, 0.3, 0.031],
      [23, 0.3, 0.069],
      [166.62, 0.04, 0.067],
      [237.38, 0.05, 0.119],
      [290.02, 0.31, 0.899],
      [349.63, 0.68, 2.377],
      [611.97, 0.4, 2.448],
    ];

    randomNumbers.map(([number, percents, output]) =>
      expect(calculatePercentageValue(number, percents)).toBe(output)
    );
  });
});
