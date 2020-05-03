import { IVendingMachine, IVendingMachineConfiguration, ICoin, IValidatedCoin, IVendingMachineItem } from '../interfaces';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;
  private _customerWallet: IValidatedCoin[];
  private _machineWallet: IValidatedCoin[];
  private _inventory: IVendingMachineItem[];

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
    this._customerWallet = [];
    this._machineWallet = [];
    this._inventory = [];
    this.loadMachineWallet(configuration.coins);
  }

  insertCoin(coin: ICoin): void {
    try {
      const validatedCoin: IValidatedCoin = this._configuration.coinValidator.validate(coin);
      this._customerWallet.push(validatedCoin);
    } catch (error) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

  selectProduct(code: string): void {
    const items: IVendingMachineItem[] = this._inventory.filter(
      (item: IVendingMachineItem): boolean => item.code === code,
    );
    if (items.length === 0) {
      this.displayMessage('SOLD OUT');
    }
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
