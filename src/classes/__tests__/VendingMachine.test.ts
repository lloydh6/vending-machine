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
import { Cola } from '../items';

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

  it('should display INSERT COINS if there are coins for change', (): void => {
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
    expect(configuration.actions.displayMessage).toHaveBeenCalledWith('INSERT COINS');
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

    it('should keep a running total of the customers wallet and output this on screen when a new coin is added', (): void => {
        // Arrange
        const validDime: ICoin = {
          radius: USACoinRadiusEnum.dime,
          weight: USACoinWeightEnum.dime,
        };
        const validQuarter: ICoin = {
          radius: USACoinRadiusEnum.quarter,
          weight: USACoinWeightEnum.quarter,
        };

        // Act
        vendingMachine.insertCoin(validDime);
        vendingMachine.insertCoin(validQuarter);

        // Assert
        expect(config.actions.displayMessage).toHaveBeenCalledTimes(2);
        expect(config.actions.displayMessage).toHaveBeenCalledWith('$0.10');
        expect(config.actions.displayMessage).toHaveBeenCalledWith('$0.35');
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

    it('should call the displayMessage function when the item is more expensive than the sum of the coins added', (): void => {
      // Arrange
      const coins: ICoin[] = [];
      const inventory: IVendingMachineItem[] = [
        new Cola(),
      ];
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
      expect(actions.displayMessage).toHaveBeenCalledWith('PRICE: $1.00');
    });

    it('should dispense product if there are some in stock and the price is correct', (): void => {
      // Arrange
      const coins: ICoin[] = [];
      const colaItem: IVendingMachineItem = new Cola();
      const inventory: IVendingMachineItem[] = [
        colaItem,
        colaItem,
      ];
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
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });

      // Act
      vendingMachine.selectProduct('A1');

      // Assert
      expect(actions.dispenseItem).toHaveBeenCalledTimes(1);
      expect(actions.dispenseItem).toHaveBeenCalledWith(colaItem);
      expect(actions.displayMessage).toHaveBeenCalledTimes(5);
      expect(actions.displayMessage).toHaveBeenCalledWith('THANK YOU');
      expect((vendingMachine as any)._inventory).toEqual([colaItem]);
    });

    it('should process the change if there is some', (): void => {
      // Arrange
      const coins: ICoin[] = [
        { weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter },
        { weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter },
        { weight: USACoinWeightEnum.dime, radius: USACoinRadiusEnum.dime },
        { weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter },
        { weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter },
        { weight: USACoinWeightEnum.dime, radius: USACoinRadiusEnum.dime },
      ];
      const colaItem: IVendingMachineItem = new Cola();
      const inventory: IVendingMachineItem[] = [
        colaItem,
        colaItem,
      ];
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
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.dime, radius: USACoinRadiusEnum.dime });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });

      // Act
      vendingMachine.selectProduct('A1');

      // Assert
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledTimes(2);
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledWith({
        monitoryValue: 0.25,
        radius: 5,
        weight: 5,
      });
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledWith({
        monitoryValue: 0.1,
        radius: 3,
        weight: 3,
      });
    });
  });

  describe('returnCoins', (): void => {
    it('should return the users coins when called', (): void => {
      // Arrange
      const coins: ICoin[] = [];
      const colaItem: IVendingMachineItem = new Cola();
      const inventory: IVendingMachineItem[] = [
        colaItem,
        colaItem,
      ];
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
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.dime, radius: USACoinRadiusEnum.dime });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.nickle, radius: USACoinRadiusEnum.nickle });
      vendingMachine.insertCoin({ weight: USACoinWeightEnum.quarter, radius: USACoinRadiusEnum.quarter });

      // Act
      vendingMachine.returnCoins();

      // Assert
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledTimes(4);
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledWith({
        monitoryValue: 0.25, radius: 5, weight: 5,
      });
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledWith({
        monitoryValue: 0.1, radius: 3, weight: 3,
      });
      expect(configuration.actions.dispenseCoin).toHaveBeenCalledWith({
        monitoryValue: 0.05, radius: 1, weight: 1,
      });
    });
  });
});