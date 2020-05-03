import { IVendingMachineItem } from '../../interfaces';

class Chips implements IVendingMachineItem {
  name: string = 'Chips';
  price: number = 0.5;
  code: string = 'C3';
}

export default Chips;
