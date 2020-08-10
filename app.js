/* eslint-disable no-console */
const inputData = require('./inputDataImport.js');
const Validator = require('./Validator.js');
const getAllConfigurations = require('./configurationImport.js');
const FeeCalculator = require('./FeeCalculator.js');

const printResultList = (results) => results.map((result) => console.log(result));

const getCalculatedCommissionFees = async () => {
  try {
    Validator.validateInput(inputData);
    const configuration = await getAllConfigurations();
    const commissionFeesCalculator = new FeeCalculator(configuration);
    const commissionFees = commissionFeesCalculator.getAllFees(inputData);

    printResultList(commissionFees);
  } catch (error) {
    console.log(error);
  }
};

getCalculatedCommissionFees();
