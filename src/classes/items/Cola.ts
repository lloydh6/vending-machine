import { IVendingMachineItem } from '../../interfaces';

class Cola implements IVendingMachineItem {
  name: string = 'Cola';
  price: number = 1;
  code: string = 'A1';
}

export default Cola;
