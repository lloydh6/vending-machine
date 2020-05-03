import { IVendingMachine, IVendingMachineConfiguration, ICoin, IValidatedCoin, IVendingMachineItem } from '../interfaces';
import { USACoinValuesEnum } from '../enums';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;
  private _customerWallet: IValidatedCoin[];
  private _customerWalletTotal: number = 0;
  private _machineWallet: IValidatedCoin[];
  private _inventory: IVendingMachineItem[];

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
    this._customerWallet = [];
    this._machineWallet = [];
    this._inventory = configuration.inventory;
    this.loadMachineWallet(configuration.coins);
  }

  insertCoin(coin: ICoin): void {
    try {
      const validatedCoin: IValidatedCoin = this._configuration.coinValidator.validate(coin);
      this.addCoinToCustomerWallet(validatedCoin);
    } catch (error) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

  selectProduct(code: string): void {
    const itemIndex: number =
      this._inventory.findIndex((item: IVendingMachineItem): boolean => item.code === code);
    const selectedItem: IVendingMachineItem = this._inventory[itemIndex];
    if (itemIndex < 0) {
      this.displayMessage('SOLD OUT');
      return;
    }
    if (selectedItem.price > this._customerWalletTotal) {
      this.displayMessage(`PRICE: $${selectedItem.price.toFixed(2)}`);
      return;
    }
    try {
      this.dispenseChangeFromWallet(selectedItem.price, [...this._machineWallet]);
      this._configuration.actions.dispenseItem(selectedItem);
      this._inventory = this._inventory.splice(itemIndex, 1);
      this.dispenseChangeFromWallet(selectedItem.price, this._machineWallet);
      this.displayMessage('THANK YOU');
    } catch (error) {
      throw error;
    }
  }

  returnCoins(): void {
    this._customerWallet.forEach((coin: IValidatedCoin): void => {
      this.subtractCoinFromCustomerWallet(coin);
    });
    this._customerWallet = [];
  }

  private dispenseChangeFromWallet(price: number, wallet: IValidatedCoin[]): void {
    let change: number = parseFloat((this._customerWalletTotal - price).toFixed(2));
    while (change > 0) {
      if (
        change >= USACoinValuesEnum.quarter
        && wallet.filter(
          (coin: IValidatedCoin): boolean => coin.monitoryValue === USACoinValuesEnum.quarter,
        ).length > 0
      ) {
        change = parseFloat((parseFloat(change.toFixed(2)) - USACoinValuesEnum.quarter).toFixed(2));
        this.dispenseCoinFromMachineWallet(USACoinValuesEnum.quarter, wallet);
      } else if (
        change >= USACoinValuesEnum.nickle
        && wallet.filter(
          (coin: IValidatedCoin): boolean => coin.monitoryValue === USACoinValuesEnum.nickle,
        ).length > 0
      ) {
        change -= USACoinValuesEnum.nickle;
        this.dispenseCoinFromMachineWallet(USACoinValuesEnum.nickle, wallet);
      } else if (
        change >= USACoinValuesEnum.dime
        && wallet.filter(
          (coin: IValidatedCoin): boolean => coin.monitoryValue === USACoinValuesEnum.dime,
        ).length > 0
      ) {
        change -= USACoinValuesEnum.dime;
        this.dispenseCoinFromMachineWallet(USACoinValuesEnum.dime, wallet);
      }else {
        throw new Error('No Sufficient Change');
      }
    }
  }

  private dispenseCoinFromMachineWallet(monitoryValue: number, wallet: IValidatedCoin[]): void {
    const coinIndex: number = wallet.findIndex(
      (validatedCoin: IValidatedCoin): boolean => validatedCoin.monitoryValue === monitoryValue,
    );
    const coin: IValidatedCoin = wallet.splice(coinIndex, 1)[0];
    if (wallet === this._machineWallet) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

  private addCoinToCustomerWallet(validatedCoin: IValidatedCoin): void {
    this._customerWallet.push(validatedCoin);
    this._customerWalletTotal += validatedCoin.monitoryValue;
    this.displayMessage(`$${this._customerWalletTotal.toFixed(2)}`);
  }

  private subtractCoinFromCustomerWallet(validatedCoin: IValidatedCoin): void {
    this._configuration.actions.dispenseCoin(validatedCoin);
  }

  private displayMessage(message: string): void {
    this._configuration.actions.displayMessage(message);
  }

  private loadMachineWallet(coins: ICoin[]): void {
    coins.forEach((coin: ICoin): void => {
      try {
        const validatedCoin: IValidatedCoin = this._configuration.coinValidator.validate(coin);
        this._machineWallet.push(validatedCoin);
      } catch (error) {
        this._configuration.actions.dispenseCoin(coin);
      }
    });
    this._machineWallet.sort(
      (a: IValidatedCoin, b: IValidatedCoin): number => a.monitoryValue > b.monitoryValue ? -1 : 1,
    );
  }

}

export default VendingMachine;
