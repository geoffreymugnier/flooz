import Transaction from './Transaction';

export default class Income extends Transaction {
    constructor(description, amount, broughtBy) {
      super(description, amount, broughtBy);
    }
}