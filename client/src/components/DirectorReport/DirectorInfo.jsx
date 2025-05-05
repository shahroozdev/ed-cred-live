const DirectorInformation = () => {
    return (
        <div className="pt-15">
            <div className="w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-xl font-semibold text-center mb-10">Director Information</h2>
                <div className="space-y-2">
                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <div>
                            <label className="w-1/3">Director's name</label>
                            <p className="text-[#686C70] text-sm">If the person you are reviewing is not the school director, tell us their exact position in order for this review to post. Enter this information following the person's name.
                            </p>
                        </div>
                        <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                    </div>

                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">Reporting Period</label>
                        <input type="text" className="w-1/3 p-2 border  border-white bg-white rounded-md outline-none" />
                    </div>

                    <div className="flex items-center  bg-[#F7F7F7] p-3 rounded-md">
                        <label className="w-2/3">School Name / Country</label>
                        <input type="text" className="w-1/3 p-2  placeholder-[#D9D9D9] border-white bg-white rounded-md outline-none" placeholder="Please spell complete name " />
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

export default DirectorInformation;
