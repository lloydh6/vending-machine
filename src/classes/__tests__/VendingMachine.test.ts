import { VendingMachine } from '../';
import { IVendingMachine } from '../../interfaces';

describe('VendingMachine tests', (): void => {
  it('should initialize a valid vending machine', (): void => {
    // Arrange
    const configuration: IVendingMachineConfiguration = {

    };

    // Act
    const vendingMachine: IVendingMachine = new VendingMachine(configuration);

    // Assert
    expect(vendingMachine).toBeDefined();
  });
});