import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addTocart, removeFromCart } from '../../redux/actions/cart';
import currency from 'currency-formatter';
import { backend_url } from '../../server';

const CartContent = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-md max-w-4xl mx-auto min-h-[400px]">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h1 className="text-2xl font-semibold">Giỏ Hàng</h1>
        <span className="text-gray-500">({cart.length} sản phẩm)</span>
      </div>

      <div className="space-y-4">
        {cart.length === 0 ? (
          <div className="text-center">Giỏ hàng trống!</div>
        ) : (
          cart.map((item, index) => (
            <CartSingle
              key={index}
              data={item}
              quantityChangeHandler={quantityChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))
        )}
      </div>

      <div className="px-5 mt-4">
        {cart.length > 0 && 
            <Link to="/checkout" style={{textDecorationLine: 'none'}}>
                <div className="h-[45px] flex items-center justify-center w-full bg-red-500 rounded-md">
                <h1 className="text-white text-lg font-semibold">
                    Đặt hàng ({currency.format(totalPrice, { code: 'VND' })})
                </h1>
            </div>
        </Link>
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = () => {
    if (data.stock < value) {
      toast.error('Sản phẩm không đủ số lượng!');
    } else {
      setValue(value + 1);
      quantityChangeHandler({ ...data, qty: value + 1 });
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
      quantityChangeHandler({ ...data, qty: value - 1 });
    }
  };

  return (
    <div className="flex items-center border rounded-md p-4">
      <img
        src={`${backend_url}${data.images[0]}`}
        alt={data.name}
        className="w-16 h-24 object-cover rounded-md"
      />
      <div className="flex-grow pl-4">
        <h4 className="font-medium">{data.name}</h4>
        <h4 className="font-medium">
          {currency.format(data.discountPrice, { code: 'VND' })}
        </h4>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-200 px-2 py-1"
          onClick={decrement}
        >
          <HiOutlineMinus size={16} />
        </button>
        <span className='block text-center min-w-[18px]'>{value}</span>
        <button
          className="bg-gray-200 px-2 py-1"
          onClick={increment}
        >
          <HiPlus size={16} />
        </button>
      </div>

      <div className="text-right pl-4 min-w-[150px]">
        <h4 className="text-red-500 font-semibold">
          {currency.format(totalPrice, { code: 'VND' })}
        </h4>
      </div>

      <button
        className="ml-4 text-gray-400"
        onClick={() => removeFromCartHandler(data)}
      >
        <RxCross1 size={24} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default CartContent;
