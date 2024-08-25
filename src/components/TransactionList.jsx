import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionList = ({ transactions, onDelete, onSelect, selectedId }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add");
  };

  const handleEditClick = () => {
    if (selectedId) {
      navigate(`/edit/${selectedId}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 float-end text-white px-4 py-2 rounded-md mb-4"
      >
        Add Transaction
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Select</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border text-center">
                <input
                  type="radio"
                  name="selectedTransaction"
                  checked={selectedId === transaction.id}
                  onChange={() => onSelect(transaction.id)}
                />
              </td>
              <td className="py-2 px-4 border">{transaction.description}</td>
              <td className="py-2 px-4 border">{transaction.type}</td>
              <td className="py-2 px-4 border">
                ₹{transaction.amount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border flex justify-center">
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        <button
          onClick={handleEditClick}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
          disabled={!selectedId}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
