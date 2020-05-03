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
import { USACoinRadiusEnum, USACoinWeightEnum, USACoinValuesEnum } from '../../enums';

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
    expect((vendingMachine as any)._customerWallet).toEqual([]);
    expect((vendingMachine as any)._machineWallet).toEqual([]);
  });

  it('should initialize a valid vending machine with the correct coins', (): void => {
    // Arrange
    const dime: ICoin = { weight: USACoinWeightEnum.dime, radius: USACoinRadiusEnum.dime };
    const coins: ICoin[] = [
      dime,
    ];
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
    expect((vendingMachine as any)._customerWallet).toEqual([]);
    expect((vendingMachine as any)._machineWallet).toEqual([
      { ...dime, monitoryValue: USACoinValuesEnum.dime },
    ]);
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

    it('should accept a valid coin and add it to the customer wallet', (): void => {
      // Arrange
      const validDime: ICoin = {
        radius: USACoinRadiusEnum.dime,
        weight: USACoinWeightEnum.dime,
      };

      // Act
      vendingMachine.insertCoin(validDime);

      // Assert
      expect(config.actions.dispenseCoin).not.toHaveBeenCalledTimes(1);
      expect(config.actions.dispenseCoin).not.toHaveBeenCalledWith(validDime);
      expect((vendingMachine as any)._customerWallet).toEqual(
        [
          {
            ...validDime,
            monitoryValue: USACoinValuesEnum.dime,
          },
        ],
      );
    });
  });

  describe('selectProduct', (): void => {
    it('should call the displayMessage function when the selected item is not in stock', (): void => {
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
      const vendingMachine: IVendingMachine = new VendingMachine(configuration);

      // Act
      vendingMachine.selectProduct('A1');

      // Assert
      expect(actions.displayMessage).toHaveBeenCalledTimes(1);
      expect(actions.displayMessage).toHaveBeenCalledWith('SOLD OUT');
    });
  });
});