import {
  ICoin,
  IVendingMachineItem,
  IVendingMachineActions,
  ICoinValidator,
} from './';

interface IVendingMachineConfiguration {
  coins: ICoin[];
  inventory: IVendingMachineItem[];
  actions: IVendingMachineActions;
  coinValidator: ICoinValidator;
}

export default IVendingMachineConfiguration;
