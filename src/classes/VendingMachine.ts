import { IVendingMachine, IVendingMachineConfiguration, ICoin, IValidatedCoin } from '../interfaces';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;
  private _customerWallet: IValidatedCoin[];
  private _machineWallet: IValidatedCoin[];

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
    this._customerWallet = [];
    this._machineWallet = [];
  }

  insertCoin(coin: ICoin): void {
    try {
      const validatedCoin: IValidatedCoin = this._configuration.coinValidator.validate(coin);
      this._customerWallet.push(validatedCoin);
    } catch (error) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

}

export default VendingMachine;
