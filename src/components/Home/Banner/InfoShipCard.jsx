import React from 'react';

const InfoShipCard = ({ name, subtitle, expiration, status, value, minAmount, maxAmount }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    alert('Mã đã được sao chép: ' + name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row">
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <button
            className="ml-4 bg-blue-500 text-white text-sm rounded-md px-3 py-1"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-sm text-gray-500">Giá trị: {value}%</p>
        <p className="text-sm text-gray-500">Tối thiểu: {minAmount}đ</p>
        <p className="text-sm text-gray-500">Tối đa: {maxAmount}đ</p>
        <div className="mt-4">
          <div className={`h-2 rounded-full ${status === 'available' ? 'bg-green-500' : 'bg-gray-300'}`} />
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col items-center">
        <p className="text-sm text-gray-400">{expiration}</p>
        <button
          className={`bg-${status === 'available' ? 'red' : 'gray'}-500 text-white text-sm rounded-md px-4 py-1 mt-2`}
        >
          {status === 'available' ? 'Sử dụng' : 'Hết hạn'}
        </button>
        <button className="text-red-500 text-sm mt-2">Chi tiết thể lệ</button>
      </div>
    </div>
  );
};

export default InfoShipCard;
