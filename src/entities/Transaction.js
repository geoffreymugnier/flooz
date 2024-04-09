export default class Transaction {
  constructor(description, amount, madeBy) {
      this.description = description;
      this.amount = amount;
      this.madeBy = madeBy;
  }

  getAmount() {
      return this.amount;
  }
}