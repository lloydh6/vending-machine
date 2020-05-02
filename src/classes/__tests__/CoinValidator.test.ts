describe('CoinValidator tests', (): void => {
  it('should initialize a coin validator class successfully', (): void => {
    // Act
    const coinValidator = new CoinValidator();

    // Assert
    expect(coinValidator).toBeDefined();
  });
});
