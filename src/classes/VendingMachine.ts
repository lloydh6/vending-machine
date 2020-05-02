import { IVendingMachine, IVendingMachineConfiguration } from '../interfaces';

class VendingMachine implements IVendingMachine {

  private _configuration: IVendingMachineConfiguration;

  constructor(configuration: IVendingMachineConfiguration) {
    this._configuration = configuration;
  }

}

export default VendingMachine;
