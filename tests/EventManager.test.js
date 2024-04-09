import { expect, test } from 'vitest'
import Event from '../src/entities/Event';
import Income from '../src/entities/Income';
import Expense from '../src/entities/Expense';
import Participant from '../src/entities/Participant';
import EventManager from '../src/manager/EventManager';

test('create an event and add some participants', () => {
  const event = new Event('My Event');
  const participant1 = new Participant('Alice');
  const participant2 = new Participant('Bob');

  event.addParticipant(participant1);
  event.addParticipant(participant2);

  expect(event.getParticipantsNumber()).toBe(2);
});

test('assert split is even between 2 people', () => {
  const event = new Event('My Event');

  const alice = new Participant('Alice');
  const aliceExpense = new Expense("Hébergement", 100, alice);

  const bob = new Participant('Bob');
  const bobExpense = new Expense("Restaurant", 50, bob);

  event.addParticipant(alice);
  event.addParticipant(bob);

  event.addExpense(aliceExpense);
  event.addExpense(bobExpense);

  const eventManager = new EventManager(event);

  const transactions = eventManager.calculateSplit();

  expect(transactions).toEqual([
    { from: 'Bob', to: 'Alice', amount: 25 }
  ]);
});

test('assert split is even between 3 people', () => {
  const event = new Event('My Event');

  const alice = new Participant('Alice');
  const aliceExpense = new Expense("Hébergement", 34, alice);

  const bob = new Participant('Bob');
  const bobExpense = new Expense("Restaurant", 11, bob);

  const john = new Participant('John');
  const johnExpense = new Expense("Quad", 84, john);

  event.addParticipant(alice);
  event.addParticipant(bob);
  event.addParticipant(john);

  event.addExpense(aliceExpense);
  event.addExpense(bobExpense);
  event.addExpense(johnExpense);

  const eventManager = new EventManager(event);

  const transactions = eventManager.calculateSplit();

  expect(transactions).toEqual([
    { from: 'Alice', to: 'John', amount: 9 },
    { from: 'Bob', to: 'John', amount: 32 }
  ]);
});

test('assert split is even when Bob already paid some money', () => {
  const event = new Event('My Event');

  const alice = new Participant('Alice');
  const aliceExpense = new Expense("Hébergement", 30, alice);

  const bob = new Participant('Bob');
  const bobExpense = new Expense("Restaurant", 5, bob);

  const bobIncome = new Income("Money Bank", 10, bob);

  event.addParticipant(alice);
  event.addParticipant(bob);

  event.addExpense(aliceExpense);
  event.addExpense(bobExpense);

  event.addIncome(bobIncome);

  const eventManager = new EventManager(event);

  const transactions = eventManager.calculateSplit();

  expect(transactions).toEqual([
    { from: 'Bob', to: 'Alice', amount: 7.5 }
  ]);
});

test('assert split is even when there are multiples expenses and incomes per participant', () => {
    const event = new Event('My Event');
  
    const alice = new Participant('Alice');
    const aliceExpense = new Expense("Hébergement", 30, alice);
    const aliceExpense2 = new Expense("Un truc", 20, alice);
  
    const bob = new Participant('Bob');
    const bobExpense = new Expense("Restaurant", 15, bob);

    const john = new Participant('John');
    const johnExpense = new Expense("Quad", 84, john);
    const johnExpense2 = new Expense("Sauna", 13, john);

    const johnIncome = new Income("Cagnotte", 30, john);
    const bobIncome = new Income("Money Bank", 10, bob);
  
    event.addParticipant(alice);
    event.addParticipant(bob);
    event.addParticipant(john);
  
    event.addExpense(aliceExpense);
    event.addExpense(aliceExpense2);
    event.addExpense(bobExpense);
    event.addExpense(johnExpense);
    event.addExpense(johnExpense2);
  
    event.addIncome(bobIncome);
    event.addIncome(johnIncome);
  
    const eventManager = new EventManager(event);
  
    const transactions = eventManager.calculateSplit();
  
    expect(transactions).toEqual([
      { from: 'Bob', to: 'John', amount: 19 },
      { from: 'Alice', to: 'John', amount: 29 },
    ]);
});
