/* eslint-disable no-prototype-builtins */
const moment = require('moment');

const VALID_INPUT_PROPERTIES = ['date', 'user_id', 'user_type', 'type', 'operation'];
const VALID_OPERATION_PROPERTIES = ['amount', 'currency'];

const VALID_DATE_FORMAT = 'YYYY-MM-DD';
const VALID_USER_TYPES = ['natural', 'juridical'];
const VALID_OPERATION_TYPES = ['cash_in', 'cash_out'];
const VALID_CURRENCY = ['EUR'];

class Validator {
  static isSortedByDate(input) {
    return input.every((item, idx, arr) => !idx || moment(arr[idx - 1].date) <= moment(item.date));
  }

  static validateSortedByDate(inputData) {
    if (!this.isSortedByDate(inputData)) {
      throw Error('Input data is not sorted by date!');
    }
  }

  static validateCurrency(currency, idx) {
    if (!VALID_CURRENCY.includes(currency)) {
      throw Error(`Wrong currency on input item index:${idx}. Must be one of: ${VALID_CURRENCY}`);
    }
  }

  static validateAmount(amount, idx) {
    if (!(typeof amount === 'number' && amount === Number(amount) && Number.isFinite(amount))) {
      throw Error(`Wrong operation amount type on input item index: ${idx}. Must be a number.`);
    }
  }

  static validateOperationType(type, idx) {
    if (!VALID_OPERATION_TYPES.includes(type)) {
      throw Error(
        `Wrong type on input item index: ${idx}. Must be one of: ${VALID_OPERATION_TYPES}`
      );
    }
  }

  static validateUserType(userType, idx) {
    if (!VALID_USER_TYPES.includes(userType)) {
      throw Error(
        `Wrong user_type on input item index: ${idx}. Must be one of: ${VALID_USER_TYPES}`
      );
    }
  }

  static validateUserId(id, idx) {
    if (!Number.isInteger(id)) {
      throw Error(`Wrong user_id format on input item index: ${idx}. Must be integer`);
    }
  }

  static validateDate(date, idx) {
    if (!moment(date, VALID_DATE_FORMAT, true).isValid()) {
      throw Error(`Wrong date format on input item index: ${idx}. Must be ${VALID_DATE_FORMAT}`);
    }
  }

  static validateInputProperties(inputData) {
    VALID_INPUT_PROPERTIES.map((property) =>
      inputData.forEach((item, idx) => {
        if (!item.hasOwnProperty(property)) {
          throw Error(`Missing or wrong property on input item index: ${idx}.`);
        }
      })
    );

    VALID_OPERATION_PROPERTIES.map((property) =>
      inputData.forEach((item, idx) => {
        if (!item.operation.hasOwnProperty(property)) {
          throw Error(`Missing or wrong property in operation object on input item index: ${idx}.`);
        }
      })
    );
  }

  static validateInput(inputData) {
    if (inputData.constructor !== Array) {
      throw Error('Input data has to be an Array');
    }

    this.validateInputProperties(inputData);

    // validate allowed types
    inputData.forEach((item, idx) => {
      this.validateDate(item.date, idx);
      this.validateUserId(item.user_id, idx);
      this.validateUserType(item.user_type, idx);
      this.validateOperationType(item.type, idx);
      this.validateAmount(item.operation.amount, idx);
      this.validateCurrency(item.operation.currency, idx);
    });

    this.validateSortedByDate(inputData);
  }
}

module.exports = Validator;
