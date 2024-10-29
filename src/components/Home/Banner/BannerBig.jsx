import React from 'react';
import InfoShip from './InfoShip';

const BannerBig = () => {
  return (
    <div className="p-4">
      <img
        src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2024/updateTrangsinhnhatT80824LDPMainbanner1920x54088.png"
        className="w-full h-auto object-cover rounded-lg"
        alt="Banner"
      />
      <InfoShip />
    </div>
  );
};

export default BannerBig;
