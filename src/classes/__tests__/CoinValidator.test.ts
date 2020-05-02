import { CoinValidator } from '../';

describe('CoinValidator tests', (): void => {
  it('should initialize a coin validator class successfully', (): void => {
    // Act
    const coin: ValidatedCoin = CoinValidator.validateCoin();

    // Assert
    expect(coin).toBeDefined();
  });
});
