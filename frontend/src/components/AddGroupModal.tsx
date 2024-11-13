import React, { useState } from "react";

function AddGroupModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal open/close state
  const [members, setMembers] = useState<string[]>([""]); // List of members, initially with one empty input

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]); // Add a new empty member input field
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers); // Remove the member from the list
  };

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value; // Update the value of the specific member input
    setMembers(updatedMembers);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Group
      </button>

      {/* Main modal */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
          onClick={toggleModal}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full bg-slate-700 rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-white">
                  Create New Group
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="groupName"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Group Name
                    </label>
                    <input
                      type="text"
                      name="groupName"
                      id="groupName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter group name"
                      required
                    />
                  </div>

                  {/* Member Inputs */}
                  <div className="col-span-2">
                    <label
                      htmlFor="members"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Members
                    </label>
                    <div
                      className="max-h-48 overflow-y-auto rounded-lg dark:bg-gray-600 dark:border-gray-500"
                      style={{ maxHeight: "200px" }}
                    >
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={member}
                            onChange={(e) =>
                              handleMemberChange(index, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder={`Member #${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="mt-2 text-blue-500 hover:text-blue-700"
                    >
                      + Add Member
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add New Group
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddGroupModal;
