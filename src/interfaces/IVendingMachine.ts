import { ICoin } from './';

interface IVendingMachine {
  insertCoin(coin: ICoin): void;
  selectProduct(code: string): void;
  returnCoins(): void;
}

export default IVendingMachine;
