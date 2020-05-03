import { IVendingMachine, IVendingMachineConfiguration, ICoin } from '../interfaces';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
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
