import {
  VendingMachine,
} from '../';
import {
  IVendingMachine,
  IVendingMachineConfiguration,
  ICoin,
  IVendingMachineItem,
  IVendingMachineActions,
} from '../../interfaces';

describe('VendingMachine tests', (): void => {
  it('should initialize a valid vending machine', (): void => {
    // Arrange
    const coins: ICoin[] = [];
    const inventory: IVendingMachineItem[] = [];
    const actions: IVendingMachineActions = {
      dispenseCoin: jest.fn(),
      dispenseItem: jest.fn(),
      displayMessage: jest.fn(),
    };
    const configuration: IVendingMachineConfiguration = {
      coins,
      inventory,
      actions,
    };

    // Act
    const vendingMachine: IVendingMachine = new VendingMachine(configuration);

    // Assert
    expect(vendingMachine).toBeDefined();
  });
});