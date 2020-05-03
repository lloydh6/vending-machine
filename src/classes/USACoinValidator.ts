import { ICoin, ICoinValidator, IValidatedCoin } from '../interfaces';
import { USACoinWeightEnum, USACoinRadiusEnum, USACoinValuesEnum } from '../enums';

class USACoinValidator implements ICoinValidator {
  validate(coin: ICoin): IValidatedCoin {
    if (coin.weight === USACoinWeightEnum.dime && coin.radius === USACoinRadiusEnum.dime) {
      return {
        ...coin,
        monitoryValue: USACoinValuesEnum.dime,
      };
    }
    throw new Error('Invalid Coin');
  }
}

export default USACoinValidator;
