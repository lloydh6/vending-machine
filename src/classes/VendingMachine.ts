import { IVendingMachine, IVendingMachineConfiguration, ICoin, IValidatedCoin } from '../interfaces';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;
  private _customerWallet: IValidatedCoin[];

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
    this._customerWallet = [];
  }

  insertCoin(coin: ICoin): void {
    try {
      const validatedCoin = this._configuration.coinValidator.validate(coin);
    } catch (error) {
      this._configuration.actions.dispenseCoin(coin);
    }
  }

}

export default VendingMachine;
