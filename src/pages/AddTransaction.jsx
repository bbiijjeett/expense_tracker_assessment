// src/pages/AddTransaction.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";

const AddTransaction = ({ onAddTransaction }) => {
  const navigate = useNavigate();

  const handleSave = (transaction) => {
    onAddTransaction(transaction);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <TransactionForm onSave={handleSave} />
    </div>
  );
};

export default AddTransaction;
