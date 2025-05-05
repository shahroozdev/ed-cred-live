const DistrictInformation = () => {
    return (
        <div className="pt-15">
            <div className="w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-xl font-semibold text-center mb-10">Districts Information</h2>
                <div className="space-y-2">

                    <div className="flex items-center bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">Districts name</label>
                        <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                    </div>


                    <div className="flex items-center bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">Country</label>
                        <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                    </div>


                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">Dates I am / I was at this Districts</label>
                        <input type="text" className="w-1/3 p-2  border-white bg-white rounded-md outline-none" />
                    </div>


                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">What is / was yearly salary range for teachers in US dollars?</label>
                        <div className="flex w-1/3 space-x-2">
                            <span className="p-2 border  border-white bg-white rounded-md">$</span>
                            <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                            <span className="p-2">To</span>
                            <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DistrictInformation;
