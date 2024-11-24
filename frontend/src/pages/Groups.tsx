// import React, { useState } from "react";
// import Card from "../components/Card";
// import Heading from "../components/Heading";
// import Button from "../components/Button";
// import "../pages/bills.css";

// type Group = {
//   name: string;
//   members: string[];
//   owe: string;
// };

// function Groups() {
//   const [groups] = useState<Group[]>([
//     {
//       name: "Friends",
//       members: ["Alice", "Bob", "Charlie", "David", "Eve"],
//       owe: "$150",
//     },
//     {
//       name: "Family",
//       members: ["Mom", "Dad", "Sister"],
//       owe: "$50",
//     },
//     {
//       name: "Office Colleagues",
//       members: ["John", "Jane", "Steve", "Lisa", "Mark", "Tom", "Anna", "Jake"],
//       owe: "$0",
//     },
//   ]);

//   return (
//     <Card className="bg-transparent text-white !overflow-x-clip h-max">
//       <div className="p-6 min-h-screen">
//         <div className="flex justify-between items-center mb-4">
//           <Heading
//             variant="bigTitle"
//             headingclassname="my-3 font-roboto-semibold"
//             text="Total Groups"
//           />
//           <Button
//             type="submit"
//             variant="filled"
//             color="primary"
//             centerclassname="flex justify-center items-center"
//           >
//             Add Group
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {groups.map((group, index) => {
//             // Split members into two parts if more than 5 members
//             const firstHalf =
//               group.members.length > 5
//                 ? group.members.slice(0, Math.ceil(group.members.length / 2))
//                 : group.members;
//             const secondHalf =
//               group.members.length > 5
//                 ? group.members.slice(Math.ceil(group.members.length / 2))
//                 : [];

//             return (
//               <div key={index} className="group-card">
//                 <div className="card-inner">
//                   {/* Front Side */}
//                   <div className="card-front shadow-md rounded-lg p-4 bg-dimGray border border-gray-300">
//                     <h2 className="text-xl font-bold mb-2">{group.name}</h2>
//                     <p className="text-white">
//                       <span className="font-medium">Total Members:</span>{" "}
//                       {group.members.length}
//                     </p>
//                     <p className="text-white">
//                       <span className="font-medium">Total You Owe:</span>{" "}
//                       <span
//                         className={`${
//                           group.owe === "$0" ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {group.owe}
//                       </span>
//                     </p>
//                   </div>
//                   {/* Back Side */}
//                   <div className="card-back shadow-md rounded-lg p-4 bg-darkGray border border-gray-300 text-white">
//                     <h2 className="text-xl font-bold mb-2">Members</h2>
//                     <div
//                       className={`${
//                         group.members.length > 5
//                           ? "grid grid-cols-2 gap-4"
//                           : "flex flex-col gap-2"
//                       }`}
//                     >
//                       {/* First Half */}
//                       <ul>
//                         {firstHalf.map((member, idx) => (
//                           <li key={idx} className="text-white">
//                             {member}
//                           </li>
//                         ))}
//                       </ul>
//                       {/* Second Half (only if more than 5 members) */}
//                       {secondHalf.length > 0 && (
//                         <ul>
//                           {secondHalf.map((member, idx) => (
//                             <li key={idx} className="text-white">
//                               {member}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default Groups;

import React, { useState } from "react";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Button from "../components/Button";
import AddGroupModal from "../components/AddGroupModal";
import "../pages/bills.css";

type Group = {
  name: string;
  members: string[];
  owe: string;
};

function Groups() {
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

  const handleAddGroup = (newGroup: Group) => {
    setGroups([...groups, newGroup]);
  };

  return (
    <>
      <Card className="bg-transparent text-white !overflow-x-clip h-max">
        <div className="p-6 min-h-screen">
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
            {groups.map((group, index) => {
              const firstHalf =
                group.members.length > 5
                  ? group.members.slice(0, Math.ceil(group.members.length / 2))
                  : group.members;
              const secondHalf =
                group.members.length > 5
                  ? group.members.slice(Math.ceil(group.members.length / 2))
                  : [];

              return (
                <div key={index} className="group-card">
                  <div className="card-inner">
                    {/* Front Side */}
                    <div className="card-front shadow-md rounded-lg p-4 bg-dimGray border border-gray-300">
                      <h2 className="text-xl font-bold mb-2">{group.name}</h2>
                      <p className="text-white">
                        <span className="font-medium">Total Members:</span>{" "}
                        {group.members.length}
                      </p>
                      <p className="text-white">
                        <span className="font-medium">Total You Owe:</span>{" "}
                        <span
                          className={`${
                            group.owe === "$0"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {group.owe}
                        </span>
                      </p>
                    </div>
                    {/* Back Side */}
                    <div className="card-back shadow-md rounded-lg p-4 bg-darkGray border border-gray-300 text-white">
                      <h2 className="text-xl font-bold mb-2">Members</h2>
                      <div
                        className={`${
                          group.members.length > 5
                            ? "grid grid-cols-2 gap-4"
                            : "flex flex-col gap-2"
                        }`}
                      >
                        {/* First Half */}
                        <ul>
                          {firstHalf.map((member, idx) => (
                            <li key={idx} className="text-white">
                              {member}
                            </li>
                          ))}
                        </ul>
                        {/* Second Half (only if more than 5 members) */}
                        {secondHalf.length > 0 && (
                          <ul>
                            {secondHalf.map((member, idx) => (
                              <li key={idx} className="text-white">
                                {member}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
