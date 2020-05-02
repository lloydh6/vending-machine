import {
  ICoin,
  IVendingMachineItem,
  IVendingMachineActions,
} from './';

interface IVendingMachineConfiguration {
  coins: ICoin[];
  inventory: IVendingMachineItem[];
  actions: IVendingMachineActions;
}

export default IVendingMachineConfiguration;
