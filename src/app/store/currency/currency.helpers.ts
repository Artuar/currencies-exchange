import { Currency } from "./currency.types";

export const getSign = (currency: Currency): string => {
  switch (currency) {
    case Currency.USD:
      return "$";
    case Currency.EUR:
      return "€";
    case Currency.GBP:
      return "£";
    default:
      return "?";
  }
};
