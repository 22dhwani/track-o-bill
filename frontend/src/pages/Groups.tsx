import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Button from "../components/Button";
import AddGroupModal from "../components/AddGroupModal";
import { useGetUserQuery } from "../features/api/userSlice";
import { useGroup } from "../context/GroupContext";

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
                onClick={() => {
                  handleCardClick(group);
                }}
              >
                <div className="card-inner">
                  {/* Front Side */}
                  <div className="card-front shadow-md rounded-lg p-4 bg-dimGray border border-gray-300">
                    <h2 className="text-xl font-bold mb-2">{group}</h2>
                    {/*<p className="text-white">
                      <span className="font-medium">Total Members:</span>{" "}
                      {group.members.length}
                    </p>
                    <p className="text-white">
                      <span className="font-medium">Total You Owe:</span>{" "}
                      <span
                        className={`${
                          group.owe === "$0" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {group.owe}
                      </span>
                    </p>*/}
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
