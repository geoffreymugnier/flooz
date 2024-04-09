export default class Event {
    constructor(name) {
        this.name = name;
        this.participants = [];
        this.incomes = [];
        this.expenses = [];
    }

    addParticipant(participant) {
        this.participants.push(participant);
        participant.event = this;
    }

    addIncome(income) {
        this.incomes.push(income);
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }

    getParticipantsNumber() {
        return this.participants.length;
    }

    getTotalExpense() {
        return this.expenses.reduce((total, expense) => total + expense.getAmount(), 0);
    }

    getTotalIncome() {
        return this.incomes.reduce((total, income) => total + income.getAmount(), 0);
    }

    getExpensesForParticipant(participant) {
        return this.expenses.filter(expense => expense.madeBy === participant);
    }

    getIncomesForParticipant(participant) {
        return this.incomes.filter(income => income.madeBy === participant);
    }
}