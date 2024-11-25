// import React, { useState } from "react";

// type AddGroupModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddGroup: (group: { name: string; members: string[]; owe: string }) => void;
// };

// const AddGroupModal: React.FC<AddGroupModalProps> = ({
//   isOpen,
//   onClose,
//   onAddGroup,
// }) => {
//   const [groupName, setGroupName] = useState("");
//   const [memberInput, setMemberInput] = useState("");
//   const [members, setMembers] = useState<string[]>([]);

//   const handleAddMember = () => {
//     if (memberInput.trim()) {
//       setMembers([...members, memberInput.trim()]);
//       setMemberInput(""); // Clear the input field after adding.
//     }
//   };

//   const handleRemoveMember = (memberToRemove: string) => {
//     setMembers(members.filter((member) => member !== memberToRemove));
//   };

//   const handleSubmit = () => {
//     if (!groupName || members.length === 0) return;

//     onAddGroup({
//       name: groupName,
//       members,
//       owe: "$0", // Default owe amount.
//     });

//     // Reset the modal fields and close the modal.
//     setGroupName("");
//     setMembers([]);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="modal-content relative bg-dimGray text-white rounded-lg shadow-lg p-6 w-96">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-white text-lg font-bold hover:text-gray-300"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h2 className="text-xl font-bold mb-4">Add New Group</h2>
//         <div className="mb-4">
//           <label className="block font-medium mb-1" htmlFor="groupName">
//             Group Name:
//           </label>
//           <input
//             id="groupName"
//             type="text"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium mb-1" htmlFor="memberInput">
//             Add Member:
//           </label>
//           <div className="flex gap-2">
//             <input
//               id="memberInput"
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               value={memberInput}
//               onChange={(e) => setMemberInput(e.target.value)}
//             />
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={handleAddMember}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         <div className="mb-4">
//           <h3 className="font-medium mb-2">Members:</h3>
//           {members.length > 0 ? (
//             <ul className="list-disc pl-5 space-y-1">
//               {members.map((member, index) => (
//                 <li key={index} className="flex justify-between items-center">
//                   {member}
//                   <button
//                     className="text-red-500 hover:underline"
//                     onClick={() => handleRemoveMember(member)}
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No members added yet.</p>
//           )}
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={handleSubmit}
//           >
//             Add Group
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddGroupModal;

import { useCreateGroupMutation } from "../features/api/groupSlice";
import React, { useEffect, useState } from "react";

type AddGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (group: { name: string; members: string[]; owe: string }) => void;
};

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isOpen,
  onClose,
  onAddGroup,
}) => {
  const [groupName, setGroupName] = useState("");
  const [createGroup] = useCreateGroupMutation();

  const handleSubmit = async () => {
    if (!groupName) return;

    onAddGroup({
      name: groupName,
      members: [],
      owe: "$0",
    });
    
    await createGroup({ group_name: groupName });
    window.location.reload();
    setGroupName("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setGroupName("");
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

        <h2 className="text-xl font-bold mb-4">Add New Group</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="groupName">
            Group Name:
          </label>
          <input
            id="groupName"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>

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
            Add Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
