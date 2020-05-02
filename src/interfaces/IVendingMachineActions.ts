import { ICoin, IVendingMachineItem } from './';

interface IVendingMachineActions {
  dispenseCoin(coin: ICoin): any;
  dispenseItem(item: IVendingMachineItem): any;
  displayMessage(message: string): any;
}

export default IVendingMachineActions;
