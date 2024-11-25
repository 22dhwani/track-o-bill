// import React, { useState } from "react";

// type AddMemberModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     onAddMember: (member: { members: string; }) => void;
// };

// const AddMemberModal: React.FC<AddMemberModalProps> = ({
//     isOpen,
//     onClose,
//     onAddMember,
// }) => {
//     const [groupName, setGroupName] = useState("");
//     // const [memberInput, setMemberInput] = useState("");
//     const [members, setMembers] = useState("");

//     // const handleAddMember = () => {
//     //     if (memberInput.trim()) {
//     //         setMembers([...members, memberInput.trim()]);
//     //         setMemberInput(""); // Clear the input field after adding.
//     //     }
//     // };

//     // const handleRemoveMember = (memberToRemove: string) => {
//     //     setMembers(members.filter((member) => member !== memberToRemove));
//     // };

//     const handleSubmit = () => {
//         if (members.length === 0) return;

//         onAddMember({
//             members: members,
//         });

//         // Reset the modal fields and close the modal.
//         setMembers("");
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="modal-content relative bg-dimGray text-white rounded-lg shadow-lg p-6 w-96">
//                 {/* Close Button */}
//                 <button
//                     className="absolute top-2 right-2 text-white text-lg font-bold hover:text-gray-300"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </button>

//                 <h2 className="text-xl font-bold mb-4">Add New Member</h2>

//                 <div className="flex justify-end gap-4">
//                     <button
//                         className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         onClick={handleSubmit}
//                     >
//                         Add Group
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddMemberModal;

import React, { useEffect, useState } from "react";

type AddMemberModalProps = {
    isOpen: boolean;
    onClose: () => void;
    // onAddMember: (member: { members: string }) => void;
};

const AddMemberModal: React.FC<AddMemberModalProps> = ({
    isOpen,
    onClose,
    // onAddMember,
}) => {
    const [memberInput, setMemberInput] = useState("");

    const handleSubmit = () => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberInput.trim())) {
            alert("Please enter a valid email address.");
            return;
        }

        // Pass the member to the parent component
        // onAddMember({
        //     members: memberInput.trim(),
        // });

        // Reset the modal fields and close the modal
        setMemberInput("");
        onClose();
    };
    // Reset the input value when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setMemberInput("");
        }
    }, [isOpen]);
    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content relative bg-dimGray text-white rounded-lg shadow-lg p-6 w-96">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-white text-lg font-bold hover:text-gray-300"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Add Member</h2>

                {/* Member Input */}
                <div className="mb-4">
                    <label className="block font-medium mb-1" htmlFor="memberInput">
                        Member Email:
                    </label>
                    <input
                        id="memberInput"
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={memberInput}
                        onChange={(e) => setMemberInput(e.target.value)}
                        placeholder="Enter member's email"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Add Member
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
