import { USACoinValidator } from '..';
import { IValidatedCoin, ICoin, ICoinValidator } from '../../interfaces';
import { USACoinWeightEnum, USACoinRadiusEnum, USACoinValuesEnum } from '../../enums';

describe('CoinValidator tests', (): void => {
  it('should throw an exception when an invalid coin is passed to the validate function', (): void => {
    // Arrange
    let result: IValidatedCoin | undefined;
    let exception: Error | undefined;
    const invalidCoin: ICoin = {
      weight: 100000,
      radius: 100000,
    };
    const usaCoinValidator: ICoinValidator = new USACoinValidator();

    // Act
    try {
      result = usaCoinValidator.validate(invalidCoin);
    } catch (error) {

      exception = error;
    }

    // Assert
    expect(result).not.toBeDefined();
    expect(exception).toBeDefined();
  });

  it('should return a valid coin when a nickle is given', (): void => {
    // Arrange
    const validCoin: ICoin = {
      weight: USACoinWeightEnum.nickle,
      radius: USACoinRadiusEnum.nickle,
    };
    const usaCoinValidator: ICoinValidator = new USACoinValidator();

    // Act
    const result: IValidatedCoin = usaCoinValidator.validate(validCoin);

    // Assert
    expect(result).toBeDefined();
    expect(result.monitoryValue).toBe(USACoinValuesEnum.nickle);
  });

  it('should return a valid coin when a dime is given', (): void => {
    // Arrange
    const validCoin: ICoin = {
      weight: USACoinWeightEnum.dime,
      radius: USACoinRadiusEnum.dime,
    };
    const usaCoinValidator: ICoinValidator = new USACoinValidator();

    // Act
    const result: IValidatedCoin = usaCoinValidator.validate(validCoin);

    // Assert
    expect(result).toBeDefined();
    expect(result.monitoryValue).toBe(USACoinValuesEnum.dime);
  });

  it('should return a valid coin when a quarter is given', (): void => {
    // Arrange
    const validCoin: ICoin = {
      weight: USACoinWeightEnum.quarter,
      radius: USACoinRadiusEnum.quarter,
    };
    const usaCoinValidator: ICoinValidator = new USACoinValidator();

    // Act
    const result: IValidatedCoin = usaCoinValidator.validate(validCoin);

    // Assert
    expect(result).toBeDefined();
    expect(result.monitoryValue).toBe(USACoinValuesEnum.quarter);
  });
});
