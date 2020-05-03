import { CoinValidator } from '../';
import { IValidatedCoin, ICoin } from '../../interfaces';

describe('CoinValidator tests', (): void => {
  it('should throw an exception when an invalid coin is passed to the validate function', (): void => {
    // Arrange
    let result;
    let exception: Error | undefined;
    const invalidCoin: ICoin = {
      weight: 100000,
      radius: 100000,
    };

    // Act
    try {
      result = CoinValidator.validate(invalidCoin);
    } catch (error) {

      exception = error;
    }

    // Assert
    expect(result).not.toBeDefined();
    expect(exception).toBeDefined();
  });
});
