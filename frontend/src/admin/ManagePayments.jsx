import React, { useState, useEffect } from "react";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/payments") // Update with your API endpoint
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Payment ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="text-center">
                <td className="border p-2">{payment.id}</td>
                <td className="border p-2">{payment.user}</td>
                <td className="border p-2">₹{payment.amount}</td>
                <td className="border p-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePayments;
