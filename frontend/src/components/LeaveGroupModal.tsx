import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material";
import Input from "../components/Input";

interface LeaveGroupModalProps {
    open: boolean;
    onClose: () => void;
}


const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "#1A1B1C",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    maxHeight: "80vh",
    overflow: "auto",
};

const LeaveGroupModal: React.FC<LeaveGroupModalProps> = ({ open, onClose }) => {


    // Custom MenuProps to apply white text
    const customMenuProps: Partial<MenuProps> = {
        PaperProps: {
            sx: {
                bgcolor: "#1A1B1C", // Background color of the dropdown
                color: "white", // White text color
            },
        },
    };

    return (
        <Modal
            className="bg-dimgGray"
            open={open}
            onClose={onClose}
            aria-labelledby="create-invoice-modal"
        >
            <Box sx={modalStyle}>
                <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-white">
                    Are you sure you want to delete this product?
                </h3>


                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    // onClick={handleSubmit}
                    >
                        Leave
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default LeaveGroupModal;
