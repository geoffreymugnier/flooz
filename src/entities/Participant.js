export default class Participant {
    constructor(name) {
        this.name = name;
        this.event = null;
        this.expenses = [];
    }

    getTotalExpense() {
        const expenses = this.event.getExpensesForParticipant(this);

        return expenses.reduce((total, expense) => total + expense.getAmount(), 0);
    }

    getTotalIncome() {
        const incomes = this.event.getIncomesForParticipant(this);

        return incomes.reduce((total, income) => total + income.getAmount(), 0);
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }
}