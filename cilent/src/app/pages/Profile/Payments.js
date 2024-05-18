import React from 'react'

export default function Payments() {

    return (
        <>
            <div className='py-4'>
                <div class="max-w-4xl mx-auto p-6  shadow-md rounded-lg ">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-xl font-semibold">Payment History (24)</h1>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Download All
                        </button>
                    </div>
                    <p class="text-zinc-600 mb-4">See history of your payment plan invoice</p>
                    <div class="overflow-x-auto">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider"
                                    >
                                        Payment Invoice
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-zinc-200 bg-zinc-100 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td class="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                        <p class="text-zinc-900 whitespace-no-wrap">Invoice#0098 - Sep 2022</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                        <p class="text-zinc-900 whitespace-no-wrap">$25.00</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                        <p class="text-zinc-900 whitespace-no-wrap">June 12-14, 2020</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                        <span
                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                            ></span>
                                            <span class="relative">Success</span>
                                        </span>
                                    </td>
                                    <td class="px-5 py-5 border-b border-zinc-200 bg-white text-sm">
                                        <button class="text-blue-500 hover:text-blue-800">Download</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
