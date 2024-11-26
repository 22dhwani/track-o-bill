import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Button from "../components/Button";
import AddGroupModal from "../components/AddGroupModal";
import { useGetUserQuery } from "../features/api/userSlice";
import { useGroup } from "../context/GroupContext";
import DeleteGroupModal from "../components/DeleteGroupModal";

type Group = {
  name: string;
  members: string[];
  owe: string;
};

function Groups() {
  const { setGroupName, setGroupId } = useGroup();
  const { data: userData, isLoading, error } = useGetUserQuery();
  console.log(userData);
  //const { data: groupsData, isLoading: groupsLoading, error: groupsError } = useGetUserGroupsQuery(userData?.groups_joined[0]);
  //console.log(groupsData);
  const [groups, setGroups] = useState<Group[]>([
    {
      name: "Friends",
      members: ["Alice", "Bob", "Charlie", "David", "Eve"],
      owe: "$150",
    },
    {
      name: "Family",
      members: ["Mom", "Dad", "Sister"],
      owe: "$50",
    },
    {
      name: "Office Colleagues",
      members: ["John", "Jane", "Steve", "Lisa", "Mark", "Tom", "Anna", "Jake"],
      owe: "$0",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleAddGroup = (newGroup: Group) => {
    setGroups([...groups, newGroup]);
  };
  const findGroupPosition = (groupName: string) => {
    return userData?.groups?.findIndex(group => group === groupName) ?? -1;
  };

  const handleCardClick = (group: string) => {

    if (!userData?.groups) return;

    const groupPosition = findGroupPosition(group);
    console.log(groupPosition);
    console.log(userData?.groups_joined);
    setGroupName(group);
    setGroupId(userData?.groups_joined[groupPosition]);
    navigate(`/home/groups/${group}/bills`);
  };

  return (
    <>

      <Card className="bg-transparent text-white !overflow-x-clip h-max">
        {openDeleteModal && (
          <DeleteGroupModal
            open={openDeleteModal}
            onClose={() => {
              setopenDeleteModal(false);
            }}
          />
        )}
        <div className="min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <Heading
              variant="bigTitle"
              headingclassname="my-3 font-roboto-semibold"
              text="Total Groups"
            />
            <Button
              type="button"
              variant="filled"
              color="primary"
              centerclassname="flex justify-center items-center"
              onClick={() => setIsModalOpen(true)}
            >
              Add Group
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData?.groups.map((group, index) => (
              <div
                key={index}
                className="group-card cursor-pointer"

              >
                <div className="card-inner">
                  {/* Front Side */}
                  <div className="card-front shadow-md rounded-lg p-4 bg-dimGray border border-gray-300 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold" onClick={() => {
                        handleCardClick(group);
                      }}>{group}</h2>
                      {/* Button at the bottom */}
                      <button className="hover:text-red-500 flex self-end mt-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          className="h-5 w-5"
                          onClick={() => setopenDeleteModal(true)}
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AddGroupModal */}
      <AddGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGroup={handleAddGroup}
      />

    </>
  );
}

export default Groups;
