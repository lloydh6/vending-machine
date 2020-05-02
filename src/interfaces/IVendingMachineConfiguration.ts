import { ICoin, IVendingMachineItem } from './';

interface IVendingMachineConfiguration {
  coins: ICoin[];
  inventory: IVendingMachineItem[];
}

export default IVendingMachineConfiguration;
