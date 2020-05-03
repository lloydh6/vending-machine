import { ICoin, IValidatedCoin } from './';

interface ICoinValidator {
  validate(coin: ICoin): IValidatedCoin;
}

export default ICoinValidator;
