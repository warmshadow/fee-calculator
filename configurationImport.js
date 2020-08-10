const axios = require('axios');

const API_BASE_URL = 'http://private-38e18c-uzduotis.apiary-mock.com/config';
const CASH_IN_URL = '/cash-in';
const CASH_OUT_NATURAL_URL = '/cash-out/natural';
const CASH_OUT_JURIDICAL_URL = '/cash-out/juridical';

const getConfiguration = async (apiBaseUrl, configUrl) => {
  const res = await axios.get(`${apiBaseUrl}${configUrl}`);

  return res.data;
};

const getAllConfigurations = async () => {
  const cashIn = await getConfiguration(API_BASE_URL, CASH_IN_URL);
  const cashOutNatural = await getConfiguration(API_BASE_URL, CASH_OUT_NATURAL_URL);
  const cashOutJuridical = await getConfiguration(API_BASE_URL, CASH_OUT_JURIDICAL_URL);

  return {
    cashIn,
    cashOutNatural,
    cashOutJuridical,
  };
};

module.exports = getAllConfigurations;
