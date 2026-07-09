
export const LoadingCard = () => {
    return (
        <>
            <div className="p-2 rounded-t-lg w-full h-[200px] bg-gray-300 animate-none"></div>
            <div className="px-5 pb-2">
                <div className="flex items-center justify-between mt-2">
                    <div className="font-bold  w-20 h-4 bg-gray-300 "></div>
                    <div className="text-black font-medium text-sm px-1 py-2.5 text-center w-16 h-4 bg-gray-300 "></div>
                </div>
                <div className="flex items-center mt-2">
                    <p className="text-sm text-gray-400 w-full h-4 bg-gray-300 "></p>
                </div>
            </div>
        </>
    );
}
