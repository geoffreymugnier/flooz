import Transaction from './Transaction';

export default class Expense extends Transaction {
    constructor(description, amount, paidBy) {
      super(description, amount, paidBy);
    }
}