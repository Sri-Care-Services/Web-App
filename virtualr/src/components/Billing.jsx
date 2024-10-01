import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Billing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetails = location.state?.packageDetails;
  const [cardNo, setCardNo] = useState(null);
  const [exDate, setExDate] = useState('');
  const [cvv, setCvv] = useState(null);
  const [cardType, setCardType] = useState('Visa');

  const validation = () => {
    if (cardNo.length !== 16 || isNaN(cardNo)) {
      alert('Invalid Card Number. It must be exactly 16 digits.');
      return false;
    }

    const exDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!exDatePattern.test(exDate)) {
      alert('Invalid Expiration Date. Use MM/YY format.');
      return false;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert('Invalid CVV. It must be exactly 3 digits.');
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (validation()) {
      const userId = localStorage.getItem('userId');
      const data = {
        cardNo: cardNo,
        exDate: exDate,
        cvv: cvv,
        userId: userId,
        amount: packageDetails?.price,
        title: packageDetails?.name,
        description: packageDetails?.description,
        date: new Date().toISOString().split('T')[0]
      };

      try {
        const response = await fetch('http://localhost:5000/makePayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          alert(`Activating ${packageDetails?.name}. Payment processed successfully!`);
          console.log(result);
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('An error occurred while processing payment.');
      }
    }
  };
//  mama aluthen dan test.js kiyala file ekak hadala mage tike push kala. Eka hariyata run wenawa okkoma. Oya dan pull karala test.js run karala balanna
  const handleBack = () => {
    navigate(-1);
  };

  if (!packageDetails) {
    return (
      <div className="text-center mt-10">
        No package details found. Please select a package.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 mb-4 mt-[-60px]">
      <button
        onClick={handleBack}
        className="absolute top-4 left-9 flex items-center text-orange-500 mt-[24px]"
        style={{ padding: '10px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="ml-2">Back</span>
      </button>

      <h2 className="text-3xl font-bold mb-6 text-orange-500">Billing Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-1500 w-[600px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {packageDetails.title}
        </h3>
        <p className="text-gray-600 mb-2">
          Price: <span className="text-orange-500 font-bold">{packageDetails.price}</span>
        </p>
        <p className="text-gray-600 mb-2">Name: {packageDetails.name}</p>
        <p className="text-gray-600 mb-2">Description: {packageDetails.description}</p>

        <form onSubmit={handlePayment} className="mt-0">
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Card Type:</label>
            <div className="border-dashed border-2 border-orange-300 rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <label className="flex items-center space-x-4">
                  <input
                    type="radio"
                    value="Visa"
                    checked={cardType === 'Visa'}
                    onChange={(e) => setCardType(e.target.value)}
                    className="form-radio h-5 w-5 text-orange-500"
                  />
                  <span className="text-gray-700">Visa</span>
                </label>

                <label className="flex items-center space-x-4">
                  <input
                    type="radio"
                    value="MasterCard"
                    checked={cardType === 'MasterCard'}
                    onChange={(e) => setCardType(e.target.value)}
                    className="form-radio h-5 w-5 text-orange-500"
                  />
                  <span className="text-gray-700">MasterCard</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-600 font-medium mb-2">
              Card Number:
            </label>
            <input
              id="cardNumber"
              type="number"
              placeholder="Card Number"
              onChange={(e) => setCardNo(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-600 font-medium mb-2">
              Expiry Date:
            </label>
            <input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              onChange={(e) => setExDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-600 font-medium mb-2">
              CVV:
            </label>
            <input
              id="cvv"
              type="number"
              placeholder="CVV"
              onChange={(e) => setCvv(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 w-full"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Billing;
