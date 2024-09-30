import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Billing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetails = location.state?.packageDetails;

  const [cardType, setCardType] = useState('Visa');

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Activating ${packageDetails?.title}. Payment processed successfully!`);
  };

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
        <p className="text-gray-600 mb-2">Data: {packageDetails.data}</p>
        <p className="text-gray-600 mb-2">Apps: {packageDetails.apps}</p>

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
              type="text"
              placeholder="Card Number"
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
              type="text"
              placeholder="CVV"
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
