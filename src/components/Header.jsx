import React from "react";

const Header = ({ income, expense, balance }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <div className="flex justify-center mt-4  rounded-xl p-5 bg-blue-200 ">
        <div className="mx-4">
          <h3 className="text-2xl font-bold">Income</h3>
          <p className="text-green-600 text-2xl font-semibold">
            ₹{income.toFixed(2)}
          </p>
        </div>
        <div className="mx-4">
          <h3 className="text-2xl font-bold">Expense</h3>
          <p className="text-red-600 text-2xl font-semibold">
            ₹{expense.toFixed(2)}
          </p>
        </div>
        <div className="mx-4">
          <h3 className="text-2xl font-bold">Balance</h3>
          <p
            className={` text-2xl font-semibold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
