import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { BsFillGeoAltFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import logo from '../../Assests/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 shadow-md border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img src={logo} alt="Fahasa Logo" className="w-64 h-auto mb-4" />
            <p>Công Ty Cổ Phần Phát Hành Sách TP HN - KINA</p>
            <p>18 Tam Trinh, Hai Ba Trưng , Hà Nội</p>
            <p className="mt-2 text-sm">Kiana shop nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Kiana shop trên toàn quốc.</p>

            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="hover:text-red-600"><FaFacebookF /></a>
              <a href="https://instagram.com" className="hover:text-red-600"><FaInstagram /></a>
              <a href="https://youtube.com" className="hover:text-red-600"><FaYoutube /></a>
              <a href="https://twitter.com" className="hover:text-red-600"><FaTwitter /></a>
              <a href="https://linkedin.com" className="hover:text-red-600"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-300 mx-8" style={{height: 'auto'}}></div>

          <div className="md:w-2/3 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-[20px] mb-4">DỊCH VỤ</h3>
                <ul>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Điều khoản sử dụng</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách bảo mật thông tin cá nhân</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách bảo mật thanh toán</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Giới thiệu Fahasa</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Hệ thống trung tâm - nhà sách</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-[20px] mb-4">HỖ TRỢ</h3>
                <ul>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách đổi - trả - hoàn tiền</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách bảo hành - bồi hoàn</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách vận chuyển</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chính sách khách sỉ</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Phương thức thanh toán và xuất HĐ</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[20px] mb-4">TÀI KHOẢN CỦA TÔI</h3>
                <ul>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Đăng nhập/Tạo mới tài khoản</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Thay đổi địa chỉ khách hàng</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Chi tiết tài khoản</a></li>
                  <li><a href="/" className="text-black hover:text-red-600 transition-all duration-300 hover:translate-x-1" style={{textDecorationLine: 'none'}}>Lịch sử mua hàng</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8">
              <div className="flex space-x-4 items-center justify-center">
                <BsFillGeoAltFill />
                <p className='mb-0'>18 Tam Trinh, Hai Ba Trưng , Hà Nội</p>
              </div>
              <div className="flex space-x-4 items-center md:mt-0">
                <MdEmail />
                <p className='mb-0'>cskh@fahasa.com.vn</p>
              </div>
              <div className="flex space-x-4 items-center md:mt-0">
                <BsFillTelephoneFill />
                <p className='mb-0'>1900636467</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-300">
          <p className="text-sm mt-3">&copy; 2024 Kiana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
