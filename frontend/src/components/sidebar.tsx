import React, { useState } from "react";
// import { HiOutlineUserGroup } from "react-icons/hi"; // Icon for group items
// import { FiLogOut } from "react-icons/fi"; // Icon for logout

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const groups = ["Cafeteria", "Shimla", "Dhabe", "Waknaghat"];

    return (
        <div
            className={`h-screen transition-all duration-300 bg-white shadow-md flex flex-col p-4 
                ${isSidebarOpen ? "w-64" : "w-16"} sm:w-64`}
        >
            {/* Sidebar toggle button for small screens */}
            <button
                className="sm:hidden text-purple-700 mb-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <div className={"flex items-center justify-center"}>
                    <button
                        className="text-purple-700 p-2"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        {/* You can add an icon here */}
                        <span>☰</span>
                    </button>
                </div> : <div className={"flex items-center justify-center"}>
                    <button
                        className="text-purple-700 p-2"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        {/* You can add an icon here */}
                        <span>☰</span>
                    </button>
                </div>}
            </button>

            {/* Show this section only if the sidebar is open */}
            <div className={`${!isSidebarOpen && "hidden"} sm:block`}>
                {/* Logo and User Profile */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-purple-700 mb-6">TrackOBill</h1>
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-200 rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-purple-700 font-bold text-lg">T</span>
                        </div>
                        <div>
                            <p className="font-semibold">Tester</p>
                            <p className="text-sm text-gray-500">User Profile</p>
                        </div>
                    </div>
                </div>

                {/* Groups List */}
                <div className="flex-grow mb-8">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">Groups</h2>
                    <div className="space-y-2">
                        {groups.map((group, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center text-left p-2 rounded hover:bg-purple-100"
                            >
                                {/* <HiOutlineUserGroup className="text-purple-500 mr-2" size={20} /> */}
                                <span>{group}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button className="flex items-center p-2 mt-auto text-gray-700 hover:bg-purple-100 rounded">
                    {/* <FiLogOut className="mr-2" /> */}
                    <span>Logout</span>
                </button>
            </div>

            {/* Show only this button when sidebar is collapsed */}

        </div>
    );
};

export default Sidebar;
