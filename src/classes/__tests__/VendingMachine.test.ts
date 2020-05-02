import { VendingMachine } from '../';
import { IVendingMachine } from '../../interfaces';

describe('VendingMachine tests', (): void => {
  let vendingMachine: IVendingMachine;

  beforeEach((): void => {
    vendingMachine = new VendingMachine();
  });

  it('should initialize a valid vending machine', (): void => {
    expect(vendingMachine).toBeDefined();
  });
});