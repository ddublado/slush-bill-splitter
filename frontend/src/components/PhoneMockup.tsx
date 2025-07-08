const PhoneMockup = () => {
    return (
        <div className="relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[10px] border-gray-800 bg-gray-800 shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-xl"></div>
            <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
                <div className="p-4 text-gray-800 text-left">
                    <p className="text-xs text-gray-400">Total Bill</p>
                    <p className="text-4xl font-bold text-primary">$48.70</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm font-semibold">
                        <div className="rounded-lg bg-gray-100 p-2">
                            <p className="text-xs text-gray-500">You pay</p>
                            <p className="text-lg text-primary">£10.66</p>
                        </div>
                        <div className="rounded-lg bg-gray-100 p-2">
                            <p className="text-xs text-gray-500">You receive</p>
                            <p className="text-lg text-gray-800">£0.00</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-primary py-3 font-bold text-white">View Bill</button>
                    <div className="mt-6">
                        <h3 className="font-bold">Costs</h3>
                        <div className="mt-2 space-y-3">
                            <div className="flex justify-between items-center rounded-lg bg-gray-100 p-3">
                                <div>
                                    <p className="font-semibold">First round</p>
                                    <p className="text-xs text-gray-500">Split between 2</p>
                                </div>
                                <p className="font-bold">£18.50</p>
                            </div>
                            <div className="flex justify-between items-center rounded-lg bg-gray-100 p-3">
                                <div>
                                    <p className="font-semibold">Nibbles</p>
                                    <p className="text-xs text-gray-500">Split between 4</p>
                                </div>
                                <p className="font-bold">£7.60</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneMockup 