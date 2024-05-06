import React from 'react'

export default function Profile() {
  return (
    <>
        <body className="bg-zinc-100 font-sans leading-normal tracking-normal">
            <div className="flex h-screen">
                
                <div className="bg-[#323948] text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                    
                    <div className="text-center">
                        <h1 className="text-lg font-medi">Arman Ali</h1>
                        <p>7319977276</p>
                        <p>armanali.shaikh77@gmail.com</p>
                    </div>
                    
                    <nav>
                        <a href="#" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                            <i className="fas fa-box"></i> Orders
                        </a>
                        <a href="#" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                            <i className="fas fa-star"></i> Favourites
                        </a>
                        <a href="#" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                            <i className="fas fa-wallet"></i> Payments
                        </a>
                        <a href="#" className="block py-2.5 px-4  transition duration-200  text-white hover:text-black hover:bg-white">
                            <i className="fas fa-map-marker-alt"></i> Addresses
                        </a>
                    </nav>
                </div>
        
                
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="flex justify-end items-center p-6 bg-[#323948]">
                        {/* <div className="flex items-center space-x-4">
                            <h1 className="text-lg font-medium text-white">Your orders with DeliveryPoint will be listed here.</h1>
                        </div> */}
                        <button className="text-white border-2 border-white font-bold py-2 px-4 hover:text-black hover:bg-white">
                            Edit Profile
                        </button>
                    </header>
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-200">
                        <div className="container mx-auto px-6 py-8">
                          
                        </div>
                    </main>
                </div>
            </div>
        </body>
    </>
  )
}
