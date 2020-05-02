import { ICoin, IValidatedCoin } from '../interfaces';

class CoinValidator {
  static validateCoin(coin: ICoin): IValidatedCoin {
    return {
      ...coin,
      monitoryValue: 1,
    };
  }
}

export default CoinValidator;
