import { ICoin, ICoinValidator, IValidatedCoin } from '../interfaces';
import { USACoinWeightEnum, USACoinRadiusEnum, USACoinValuesEnum } from '../enums';

class USACoinValidator implements ICoinValidator {

  private generateValidCoin(coin: ICoin, value: USACoinValuesEnum): IValidatedCoin {
    return {
      ...coin,
      monitoryValue: value,
    };
  }

  validate(coin: ICoin): IValidatedCoin {
    if (coin.weight === USACoinWeightEnum.dime && coin.radius === USACoinRadiusEnum.dime) {
      return this.generateValidCoin(coin, USACoinValuesEnum.dime);
    } else if (coin.weight === USACoinWeightEnum.nickle && coin.radius === USACoinRadiusEnum.nickle) {
      return this.generateValidCoin(coin, USACoinValuesEnum.nickle);
    } else if (coin.weight === USACoinWeightEnum.quarter && coin.radius === USACoinRadiusEnum.quarter) {
      return this.generateValidCoin(coin, USACoinValuesEnum.quarter);
    }
    throw new Error('Invalid Coin');
  }
}

export default USACoinValidator;
