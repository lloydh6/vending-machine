import { IVendingMachineItem } from '../../interfaces';

class Candy implements IVendingMachineItem {
  name: string = 'Candy';
  price: number = 0.65;
  code: string = 'B2';
}

export default Candy;
