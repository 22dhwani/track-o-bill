import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material";
import Input from "../components/Input";
import { useGetSettleUpDataQuery } from "../features/api/settleUpSlice";
import { useGroup } from "../context/GroupContext";

interface SettleUpModalProps {
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

const SettleUpModal: React.FC<SettleUpModalProps> = ({ open, onClose }) => {
    const { groupId } = useGroup();
    const { data: settleUpData, isLoading, isError, error } = useGetSettleUpDataQuery(Number(groupId));
    console.log(settleUpData);
    const [clientName, setClientName] = useState("Freshco");
    // const [total, setTotal] = useState(22500); // Total price editable
    const [total, setTotal] = useState(0); // Total price

    const [selectedFrom, setSelectedFrom] = useState<string[]>([
        "Dhrumil",
    ]);

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
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-white">Settle Up</h1>
                </header>


                {/* User Info */}
                {/* <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-white">Bill Info</h2>
                    <div className="flex space-x-4">
                        <Select
                            value={selectedFrom}
                            onChange={(e) => setSelectedFrom(e.target.value as string)}
                            renderValue={(selected) => selected}
                            className="flex-1 !text-white bg-black border-white border-[0.5px]"
                            MenuProps={customMenuProps} // Apply custom MenuProps
                        >
                            <MenuItem value="Dhrumil" className="text-white">
                                Dhrumil
                            </MenuItem>
                            <MenuItem value="Smit" className="text-white">
                                Smit
                            </MenuItem>
                        </Select>
                    </div>
                </section> */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-white">Bill Info</h2>
                    <div className="flex space-x-4">
                        <Select
                            value={selectedFrom}
                            onChange={(e: any) => setSelectedFrom(e.target.value)}
                            renderValue={(selected) => selected}
                            className="flex-1 !text-white bg-black border-white border-[0.5px]"
                            MenuProps={customMenuProps} // Apply custom MenuProps
                        >
                            <MenuItem value="Dhrumil" className="text-white">
                                Dhrumil
                            </MenuItem>
                            <MenuItem value="Smit" className="text-white">
                                Smit
                            </MenuItem>
                        </Select>
                    </div>
                </section>



                {/* Total Price Section */}
                <section className="space-y-2 mb-4">
                    <h2 className="text-sm font-medium text-white">Total Price</h2>
                    <input
                        type="number"
                        value="20"
                        readOnly // Make input read-only
                        className="w-full p-2 border rounded-md bg-black text-white placeholder:text-white"
                    />
                </section>

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
                        Settle
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default SettleUpModal;
