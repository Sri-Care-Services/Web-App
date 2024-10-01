import React, { useState, useEffect } from "react";
import moment from "moment";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statementLoading, setStatementLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch payment history from API
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getPaymentHistory/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment history.");
        }
        const data = await response.json();
        setPayments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  const handleGetPaymentStatement = async () => {
    setStatementLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/emailMonthlyStatement/${userId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error("Failed to send payment statement.");
      }

      alert("Monthly payment statement has been sent to your email.");
    } catch (error) {
      alert(error.message);
    } finally {
      setStatementLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center p-4 border border-gray-200 rounded-lg w-[760px] bg-white shadow-md"
          >
            <div className="flex-1">
              <p className="text-gray-800 text-xl">{payment.title}</p>
              <p className="text-gray-500 text-sm">{payment.description}</p>
              <p className="text-orange-500">Rs. {payment.amount}</p>
              <span className="text-xs text-gray-400">
                {payment.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 text-white rounded-md transition ${
            statementLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
          onClick={handleGetPaymentStatement}
          disabled={statementLoading}
        >
          {statementLoading ? "Sending..." : "Get Payment Statement"}
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
