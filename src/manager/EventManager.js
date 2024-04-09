function createTransactions(creditors, debtors) {
  const transactions = [];

  debtors.forEach(debtor => {
      creditors.forEach(creditor => {
          if (debtor.balance < 0 && creditor.balance > 0) {
              const amount = Math.min(-debtor.balance, creditor.balance);
              transactions.push({ from: debtor.name, to: creditor.name, amount });

              debtor.balance += amount;
              creditor.balance -= amount;
          }
      });
  });
  
  return transactions;
}

export default class EventManager {
  constructor(event) {
      this.event = event;
  }

  calculateSplit() {
    const totalExpense = this.event.getTotalExpense();
    const totalIncome = this.event.getTotalIncome();

    const totalParticipants = this.event.getParticipantsNumber();
    const splitAmount = (totalExpense + totalIncome) / totalParticipants;

    this.event.participants.forEach(participant => {
        const totalParticipantIncome = participant.getTotalIncome(); 
        const totalParticipantExpense = participant.getTotalExpense();
        
        participant.balance = (totalParticipantExpense + totalParticipantIncome) - splitAmount;
    });
    
    const creditors = this.event.participants.filter(p => p.balance > 0);
    const debtors = this.event.participants.filter(p => p.balance < 0);

    return createTransactions(creditors, debtors);
}
}
