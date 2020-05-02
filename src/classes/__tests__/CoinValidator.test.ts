import { CoinValidator } from '../';
import { IValidatedCoin } from '../../interfaces';

describe('CoinValidator tests', (): void => {
  it('should initialize a coin validator class successfully', (): void => {
    // Act
    const coin: IValidatedCoin = CoinValidator.validateCoin();

    // Assert
    expect(coin).toBeDefined();
  });
});
