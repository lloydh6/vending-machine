import { ICoin, ICoinValidator, IValidatedCoin } from '../interfaces';
import { USACoinWeightEnum, USACoinRadiusEnum, USACoinValuesEnum } from '../enums';

class USACoinValidator implements ICoinValidator {
  validate(coin: ICoin): IValidatedCoin {
    if (coin.weight === USACoinWeightEnum.dime && coin.radius === USACoinRadiusEnum.dime) {
      return {
        ...coin,
        monitoryValue: USACoinValuesEnum.dime,
      };
    } else if (coin.weight === USACoinWeightEnum.nickle && coin.radius === USACoinRadiusEnum.nickle) {
      return {
        ...coin,
        monitoryValue: USACoinValuesEnum.nickle,
      };
    } else if (coin.weight === USACoinWeightEnum.quarter && coin.radius === USACoinRadiusEnum.quarter) {
      return {
        ... coin,
        monitoryValue: USACoinValuesEnum.quarter,
      };
    }
    throw new Error('Invalid Coin');
  }
}

export default USACoinValidator;
