import { useEffect} from "react";
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
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";

const CartPage = () => {

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const token = localStorage.getItem('token');

  const handleOrder = async (cart) => {
    try {
      const payload = [{
        _id: cart._id,
        unit: totalQuantity,
      }]
        const response = await axios.post("https://delivery-point.onrender.com/create-order", payload, {
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

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-center gap-5 px-4 md:px-0">
            <div className="w-full md:w-8/12">
              <Card hover={false}>
                <CardHeader>
                  <h5 className="text-lg font-semibold text-gray-900">Cart - {cart.length} items</h5>
                </CardHeader>
                <CardBody>
                  {cart.map((data) => (
                    <div key={data.id} className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-4 last:mb-0 pb-4 last:pb-0 border-b border-gray-100 last:border-0">
                      <div className="w-20 sm:w-1/4 md:w-3/12 shrink-0">
                        <div className="bg-gray-100 overflow-hidden rounded-xl">
                          <img
                            src={`https://delivery-point.onrender.com/images/${data.images}`}
                            alt="Food Images"
                            className="w-full h-20 sm:h-32 object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-[120px] sm:w-4/12">
                        <p className="font-semibold text-gray-900">{data.name}</p>
                        <button
                          type="button"
                          className="mt-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          onClick={() => dispatch(removeItem(data._id))}
                        >
                          <MdDelete />
                        </button>
                      </div>
                      <div className="order-3 sm:order-none w-full sm:w-auto sm:flex-1 flex items-center justify-between sm:justify-end gap-2">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          onClick={() => dispatch(decreaseItemQuantity(data._id))}
                        >
                          <FaMinus className="h-3 w-3" />
                        </button>
                        <input
                          id="quantity"
                          min="0"
                          name="quantity"
                          value={data.quantity}
                          type="number"
                          className="w-10 border border-gray-300 rounded-lg text-center text-gray-900"
                          readOnly
                        />
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          onClick={() => dispatch(increaseItemQuantity(data._id))}
                        >
                          <FaPlus className="h-3 w-3" />
                        </button>
                        <p className="font-semibold text-gray-900 ml-2">₹ {data.price}</p>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4 border-gray-100" />
                </CardBody>
              </Card>
            </div>

            <div className="w-full md:w-4/12 px-4 md:px-0">
              <Card hover={false}>
                <CardHeader>
                  <h5 className="text-lg font-semibold text-gray-900">Summary</h5>
                </CardHeader>
                <CardBody>
                  <ul>
                    <li className="flex justify-between items-center border-b border-gray-100 py-2 text-gray-700">
                      <span>Total Quantity</span>
                      <span>{totalQuantity}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-gray-100 py-2 text-gray-900">
                      <span className="font-semibold">Total amount</span>
                      <span className="font-semibold">₹{totalPrice}</span>
                    </li>
                  </ul>
                  <Button
                    type="button"
                    onClick={() => handleOrder(cart)}
                    fullWidth
                    pill
                    className="mt-4"
                  >
                    Order Now
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default CartPage;
