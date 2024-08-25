import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const addTransaction = (transaction) => {
    axios
      .post("http://localhost:5000/transactions", transaction)
      .then((response) => setTransactions([...transactions, response.data]))
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const updateTransaction = (updatedTransaction) => {
    axios
      .put(
        `http://localhost:5000/transactions/${updatedTransaction.id}`,
        updatedTransaction
      )
      .then((response) => {
        const updatedTransactions = transactions.map((t) =>
          t.id === updatedTransaction.id ? response.data : t
        );
        setTransactions(updatedTransactions);
      })
      .catch((error) => console.error("Error updating transaction:", error));
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:5000/transactions/${id}`)
      .then(() => setTransactions(transactions.filter((t) => t.id !== id)))
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header income={income} expense={expense} balance={balance} />
        <Routes>
          <Route
            path="/"
            element={
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
                onSelect={handleSelect}
                selectedId={selectedId}
              />
            }
          />
          <Route
            path="/add"
            element={<AddTransaction onAddTransaction={addTransaction} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditTransaction
                transactions={transactions}
                onUpdateTransaction={updateTransaction}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
