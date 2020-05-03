import { ICoin } from './';

interface IVendingMachine {
  insertCoin(coin: ICoin): void;
}

export default IVendingMachine;
