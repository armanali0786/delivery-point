import React, { useEffect } from 'react'
import { fetchOrderData } from '../apis/ApiCall';

export default function Orders() {

    useEffect(() => {
        const fetchOrders = async () => {
            try {
              const response = await fetchOrderData();
              console.log(response)
            } catch (error) {
              console.error('Error fetching offers:', error);
            }
          }
        fetchOrders();
      }, []);

      


    return (
        <>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">Anna Kuteera</h3>
                        <span className="text-sm text-zinc-500">Delivered on Fri, Aug 18, 2023, 06:22 PM</span>
                    </div>
                    <div className="flex justify-between">
                        <img src="https://placehold.co/100x100" alt="Dish Image" className="rounded-lg" />
                        <div className="flex-1 ml-4">
                            <p>Banashankari</p>
                            <p className="text-sm text-zinc-500">ORDER #5473653209 | Fri, Aug 18, 2023, 06:10 PM</p>
                            <button className="text-blue-500 underline mt-1">VIEW DETAILS</button>
                            <p className="mt-2">Idly (2 Pcs) x 1</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Total Paid: ₹110</p>
                        </div>
                    </div>
                    <div className="flex mt-3">
                        <button className="bg-orange-500 text-white rounded-md px-4 py-2 mr-2">REORDER</button>
                        <button className="bg-orange-500 text-white rounded-md px-4 py-2">HELP</button>
                    </div>
                </div>

            </div>
        </>
    )
}
