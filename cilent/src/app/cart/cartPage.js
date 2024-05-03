import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./cartSlice";

const CartPage = () => {

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const token = localStorage.getItem('token');


  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/customer/cart", {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         }
  //       });
  //       const cartItemsData = response.data; // Array of cart items
  //       setCartItems(cartItemsData)
  //       console.log(cartItemsData)
  //     } catch (error) {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   };
  //   fetchData();
  // }, [dispatch, token]);



  const handleOrder = async (cart) => {
    try {
      const payload = [{
        _id: cart._id,
        unit: totalQuantity,
      }]
        const response = await axios.post("http://localhost:8080/create-order", payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Note the space after 'Bearer'
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        }
    } catch (error) {
      console.error('Error');
    }

  }

  console.log(cart)
  return (
    <>
      <ToastContainer />
      <section className="bg-gradient-to-br from-slate-200 to-gray-300">
        <div className="container mx-auto py-5">
          <div className="flex justify-center my-4">
            <div className="w-full md:w-8/12">
              <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h5 className="text-xl font-semibold">Cart - {cart.length} items</h5>
                </div>
                <div className="p-4">
                  {/* {cartItems && cartItems.map((item) => {
                    const data = item.food;
                    return ( */}
                  {cart.map((data) => (
                    <div key={data.id} className="flex items-center justify-between mb-4">
                      <div className="w-1/4 md:w-3/12">
                        <div className="bg-gray-200 hover:bg-gray-300 overflow-hidden rounded-lg">
                          <img
                            src={`http://localhost:8080/images/${data.images}`}
                            alt="Food Images"
                            className="w-full h-32"
                          />
                        </div>
                      </div>
                      <div className="mx-3 w-1/3 md:w-4/12">
                        <p className="font-semibold">{data.name}</p>
                        <button
                          type="button"
                          className="bg-indigo-500  hover:bg-indigo-600 text-white rounded-[5px] p-2  me-1 mb-2"
                          onClick={() => dispatch(removeItem(data._id))}
                        >
                          <i className="fas fa-trash"><MdDelete /></i>
                        </button>
                      </div>
                      <div className="w-1/4 md:w-6/12 sm:w-3/12 flex items-center justify-between">
                        <button
                          className="bg-indigo-500  hover:bg-indigo-600 text-white rounded-[5px] p-2 px-3 me-2"
                          onClick={() => dispatch(decreaseItemQuantity(data._id))}
                        >
                          <i className="fas fa-minus"><FaMinus /></i>
                        </button>
                        <input
                          id="quantity"
                          min="0"
                          name="quantity"
                          value={data.quantity}
                          type="number"
                          className="form-input w-8 border-2 border-slate-500 bottom-2 rounded-sm text-black"
                          readOnly
                        />
                        <button
                          className="btn bg-indigo-500  hover:bg-indigo-600 text-white rounded-[5px] p-2  px-3 ms-2"
                          onClick={() => dispatch(increaseItemQuantity(data._id))}
                        >
                          <i className="fas fa-plus"><FaPlus /></i>
                        </button>
                        <p className="text-start text-md-center font-semibold">₹ {data.price}</p>
                      </div>
                    </div>
                  ))}
                  {/* )
               })} */}
                  <hr className="my-4" />
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-5">
              <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h5 className="text-xl font-semibold">Summary</h5>
                </div>
                <div className="p-4">
                  <ul className="list-group list-group-flush">
                    <li className="flex justify-between items-center border-b border-gray-200 py-2">
                      <span>Total Quantity</span>
                      <span>{totalQuantity}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-gray-200 py-2">
                      <span><strong>Total amount</strong></span>
                      <span><strong>{totalPrice}</strong></span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleOrder(cart)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg text-white btn-lg mt-4"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default CartPage;
