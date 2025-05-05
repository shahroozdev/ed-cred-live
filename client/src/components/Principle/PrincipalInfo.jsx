const PrincipalInformation = () => {
    return (
        <div className="pt-15">
            <div className="w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-xl font-semibold text-center mb-10">Pricipal Information</h2>
                <div className="space-y-2">
                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">Principal's Name & Division</label>
                        <input type="text" className="w-1/3 p-2 border placeholder-[#D9D9D9] border-white bg-white rounded-md outline-none" placeholder="Example: John Doe - Middle School" />
                    </div>

                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md ">
                        <label className="w-2/3">Reporting Period</label>
                        <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                    </div>

                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">School Name / Country</label>
                        <input type="text" className="w-1/3 p-2 placeholder-[#D9D9D9] border-white bg-white rounded-md outline-none" placeholder="Please: NO abbreviations / acronyms" />
                    </div>

                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">School Web Site</label>
                        <input type="text" className="w-1/3 p-2 border border-white bg-white rounded-md outline-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrincipalInformation;
