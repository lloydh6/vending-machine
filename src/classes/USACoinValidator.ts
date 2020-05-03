import { ICoin, ICoinValidator, IValidatedCoin } from '../interfaces';

class USACoinValidator implements ICoinValidator {
  validate(coin: ICoin): IValidatedCoin {
    throw new Error('Invalid Coin');
  }
}

export default USACoinValidator;
