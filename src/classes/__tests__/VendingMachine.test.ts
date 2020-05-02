import { VendingMachine } from '../';
import {
  IVendingMachine,
  IVendingMachineConfiguration,
  ICoin,
  IVendingMachineItem,
} from '../../interfaces';

describe('VendingMachine tests', (): void => {
  it('should initialize a valid vending machine', (): void => {
    // Arrange
    const coins: ICoin[] = [];
    const inventory: IVendingMachineItem[] = [];
    const configuration: IVendingMachineConfiguration = {
      coins,
      inventory,
    };

    // Act
    const vendingMachine: IVendingMachine = new VendingMachine(configuration);

    // Assert
    expect(vendingMachine).toBeDefined();
  });
});