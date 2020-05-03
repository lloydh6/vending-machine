import { ICoin, IValidatedCoin } from '../interfaces';

class CoinValidator {
  static validate(coin: ICoin): IValidatedCoin {
    throw new Error('Invalid Coin');
  }
}

export default CoinValidator;
