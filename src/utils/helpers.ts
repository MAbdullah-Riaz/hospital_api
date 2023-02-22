import CC from 'currency-converter-lt';
export const exchangeRates = async (currencyFrom, currencyTo, totalAmount) => {
  let currencyConverter = new CC({
    from: currencyFrom,
    to: currencyTo,
    amount: totalAmount,
  });

  return currencyConverter.convert();
};
