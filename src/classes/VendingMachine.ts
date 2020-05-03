import { IVendingMachine, IVendingMachineConfiguration, ICoin, IValidatedCoin, IVendingMachineItem } from '../interfaces';

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
      this.updateCustomerWallet(validatedCoin);
    } catch (error) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

  selectProduct(code: string): void {
    const itemIndex: number =
      this._inventory.findIndex((item: IVendingMachineItem): boolean => item.code == code);
    const selectedItem: IVendingMachineItem = this._inventory[itemIndex];
    if (itemIndex < 0) {
      this.displayMessage('SOLD OUT');
      return;
    }
    if (selectedItem.price > this._customerWalletTotal) {
      this.displayMessage(`PRICE: $${selectedItem.price.toFixed(2)}`);
      return;
    }
    this._configuration.actions.dispenseItem(selectedItem);
    this._inventory = this._inventory.splice(itemIndex, 1);
  }

  private updateCustomerWallet(validatedCoin: IValidatedCoin): void {
    this._customerWallet.push(validatedCoin);
    this._customerWalletTotal += validatedCoin.monitoryValue;
    this.displayMessage(`$${this._customerWalletTotal.toFixed(2)}`);
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
  }

}

export default VendingMachine;
