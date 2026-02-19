export type Verdict = "SAFE" | "FRAUD" | "REVIEW";

export interface Transaction {
  timestamp: string;
  id: string;
  amount: number;
  currency: string;
  country: string;
  merchant: string;
  cardType: string;
  clientName: string;
  clientId: string;
  probability: number;
  verdict: Verdict;
}

const firstNames = ["Jean", "Marie", "Ahmed", "Fatima", "Pierre", "Sophie", "Youssef", "Clara", "Abdou", "Léa", "Omar", "Camille", "Hassan", "Emma", "Ibrahima"];
const lastNames = ["Dupont", "Martin", "Benali", "Diallo", "Bernard", "Leclerc", "El Amrani", "Ndiaye", "Petit", "Lambert"];
const merchants = ["Amazon EU", "Carrefour Online", "Ali Express", "Steam Store", "Apple Store", "Uber Eats", "Booking.com", "Nike Store", "Unknown Merchant", "CryptoExchange Ltd"];
const countries = ["FR", "DE", "US", "NG", "GB", "CN", "RU", "BR", "JP", "AE"];
const highRiskCountries = ["NG", "RU", "CN"];
const cardTypes = ["VISA", "MASTERCARD", "AMEX"];
const currencies = ["EUR", "USD", "GBP"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId(): string {
  const hex = () => Math.random().toString(16).substring(2, 6);
  return `TXN-${hex()}...${hex()}`;
}

function generateClientId(): string {
  return `CLT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function generateTransaction(): Transaction {
  const country = randomFrom(countries);
  const amount = Math.random() < 0.15
    ? Math.round(Math.random() * 50000 + 5000) // high amount
    : Math.round(Math.random() * 500 + 5); // normal
  
  const isHighRisk = highRiskCountries.includes(country);
  const isHighAmount = amount > 5000;
  
  let probability: number;
  if (isHighRisk && isHighAmount) {
    probability = 0.7 + Math.random() * 0.3;
  } else if (isHighRisk || isHighAmount) {
    probability = 0.3 + Math.random() * 0.4;
  } else {
    probability = Math.random() * 0.15;
  }

  let verdict: Verdict;
  if (probability > 0.7) verdict = "FRAUD";
  else if (probability > 0.3) verdict = "REVIEW";
  else verdict = "SAFE";

  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

  return {
    timestamp,
    id: generateId(),
    amount,
    currency: randomFrom(currencies),
    country,
    merchant: randomFrom(merchants),
    cardType: randomFrom(cardTypes),
    clientName: `${randomFrom(firstNames)} ${randomFrom(lastNames)}`,
    clientId: generateClientId(),
    probability: parseFloat(probability.toFixed(4)),
    verdict,
  };
}

export function generateBatch(count: number): Transaction[] {
  return Array.from({ length: count }, () => generateTransaction());
}
