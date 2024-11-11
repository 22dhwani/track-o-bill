import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const Dashboard: React.FC = () => {
    const [open, setOpen] = useState(false);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%", // Adjust width to be responsive
        maxWidth: 400, // Set max width to keep it from becoming too large
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Dashboard Content */}
            <div className="flex-grow p-4 sm:p-6 bg-purple-50 min-h-screen">
                {/* Top bar with search and Add Group button */}
                <div className="flex items-center justify-between mb-6">
                    <TextField label="Search" variant="outlined" size="small" className="bg-white" />
                    <button
                        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                        onClick={() => setOpen(true)}
                    >
                        Add Group
                    </button>
                </div>

                {/* Groups List Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Group Card Example */}
                    {["Cafeteria", "Shimla", "Dhabe", "Waknaghat"].map((group, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">{group}</h3>
                            </div>
                            {/* Sample expenses */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Samosa</span>
                                    <span className="text-sm text-gray-500">₹60</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Cold Drinks</span>
                                    <span className="text-sm text-gray-500">₹120</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Adding New Group */}
                <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title">
                    <Box sx={style}>
                        <h2 className="mb-4 font-semibold text-lg">Add Group</h2>
                        <div className="space-y-3">
                            <TextField label="Group Name" fullWidth />
                            <TextField label="Budget" fullWidth />
                            <TextField label="Type" fullWidth />
                        </div>
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                            >
                                Create Group
                            </button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default Dashboard;
