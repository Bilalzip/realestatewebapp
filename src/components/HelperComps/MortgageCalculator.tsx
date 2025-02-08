import React, { useState } from "react";

const MortgageCalculator = ({ price }: { price: number }) => {
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const loanAmount = price * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold">Mortgage Calculator</h2>
      <div className="flex gap-4 mt-4">
        <label className="flex-1">
          Down Payment (%)
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full p-2 border rounded-md" />
        </label>
        <label className="flex-1">
          Interest Rate (%)
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full p-2 border rounded-md" />
        </label>
      </div>
      <label className="block mt-4">
        Loan Term (Years)
        <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full p-2 border rounded-md" />
      </label>
      <p className="mt-4 text-lg font-semibold text-green-700">Estimated Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
    </div>
  );
};

export default MortgageCalculator;
