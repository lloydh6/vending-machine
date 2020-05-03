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
import USACoinValidator from '../USACoinValidator';

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
      coinValidator: new USACoinValidator(),
    };

    // Act
    const vendingMachine: IVendingMachine = new VendingMachine(configuration);

    // Assert
    expect(vendingMachine).toBeDefined();
  });

  describe('insertCoin', (): void => {
    let vendingMachine: IVendingMachine;
    let config: IVendingMachineConfiguration;

    beforeEach((): void => {
      config = {
        coins: [],
        inventory: [],
        actions: {
          dispenseCoin: jest.fn(),
          dispenseItem: jest.fn(),
          displayMessage: jest.fn(),
        },
        coinValidator: new USACoinValidator(),
      };
      vendingMachine = new VendingMachine(config);
    });

    it('should reject an invalid coin', (): void => {
      // Arrange
      const invalidCoin: ICoin = {
        radius: 10000,
        weight: 10000,
      };

      // Act
      vendingMachine.insertCoin(invalidCoin);

      // Assert
      expect(config.actions.dispenseCoin).toHaveBeenCalledTimes(1);
      expect(config.actions.dispenseCoin).toHaveBeenCalledWith(invalidCoin);
      expect((vendingMachine as any)._customerWallet).toEqual([]);
    });
  });
});