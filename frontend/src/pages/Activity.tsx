import React from "react";
import Card from "../components/Card";
import Heading from "../components/Heading";

function Activity() {
  const activities = [
    {
      id: 1,
      user: "Durva",
      emoji: "😊",
      action: "added",
      item: "Milk",
      group: "1352 Partington House 🏡",
      amount: "You owe $2.23",
      owed: true,
      date: "Sunday",
      icon: "🛒",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      user: "Dhwani",
      emoji: "😊",
      action: "added",
      item: "Freshco",
      group: "Homies 🏡",
      amount: "You owe $1.82",
      owed: false,
      date: "Sunday",
      icon: "📋",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      user: "Dhrumil S.",
      action: "updated",
      item: "Costco",
      group: "1352 Partington House 🏡",
      amount: "You owe $2.36",
      owed: true,
      date: "Sunday",
      icon: "🧴",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 4,
      user: "Dhrumil S.",
      action: "added",
      item: "Costco",
      group: "1352 Partington House 🏡",
      amount: "You owe $2.21",
      owed: false,
      date: "Sunday",
      icon: "🧴",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 5,
      user: "Devansh M.",
      action: "added",
      item: "V dsei",
      group: "1352 Partington House 🏡",
      amount: "You owe $2.20",
      owed: true,
      date: "Nov 13",
      icon: "📋",
      color: "bg-gray-100 text-gray-600",
    },
    {
      id: 6,
      user: "You",
      action: "added",
      item: "Garlic dahi",
      group: "Three Musketeers 🏡",
      owed: true,
      amount: "You get back $4.27",
      date: "Nov 13",
      icon: "🛒",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 7,
      user: "You",
      action: "added",
      item: "Biscuit",
      group: "1352 Partington House 🏡",
      amount: "You get back $3.18",
      owed: false,
      date: "Nov 13",
      icon: "🛒",
      color: "bg-green-100 text-green-600",
    },
  ];
  const [friends, setFriends] = React.useState([
    { name: "Durva", email: "durva@example.com" },
    { name: "Dhrumil S.", email: "dhrumil@example.com" },
    { name: "Devansh M.", email: "devansh@example.com" },
  ]);

  const [peopleToAdd, setPeopleToAdd] = React.useState([
    { name: "Aarav", email: "aarav@example.com" },
    { name: "Nisha", email: "nisha@example.com" },
    { name: "Karan", email: "karan@example.com" },
  ]);

  const removeFriend = (index) => {
    const updatedFriends = friends.filter((_, i) => i !== index);
    setFriends(updatedFriends);
  };

  const connectFriend = (index) => {
    const newFriend = peopleToAdd[index];
    setFriends([...friends, newFriend]);
    const updatedPeople = peopleToAdd.filter((_, i) => i !== index);
    setPeopleToAdd(updatedPeople);
  };
  return (
    <Card className=" bg-transparent text-white  !overflow-x-clip h-max">
      <Heading text="Your Recent Activity" variant="bigTitle" />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10">
        <div className="bg-dimGray rounded-lg h-max my-5">
          {/* Left Side: Recent Activity */}

          <div className=" p-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 border-b-[0.5px] border-b-gray-500 pb-4"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${activity.color}`}
                  >
                    <span className="text-lg">{activity.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.emoji} {activity.action}{" "}
                      <span className="font-semibold">"{activity.item}"</span>{" "}
                      in{" "}
                      <span className="font-semibold">"{activity.group}"</span>.
                    </p>
                    <p
                      className={` font-medium ${
                        activity.owed == true
                          ? "text-red-600"
                          : "text-green-400"
                      }`}
                    >
                      {activity.amount}
                    </p>
                    <p className="text-gray-300 text-sm">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side: Friends and Add Friend Section */}

        {/* Right Side: Friends and Add Friend Section */}
        <div className="flex flex-col space-y-10 my-5">
          {/* Friends Card */}
          <div className="bg-dimGray rounded-lg p-4">
            <Heading text="Your Friends" variant="headingTitle" />
            <ul className="space-y-4 mt-4">
              {friends.map((friend, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gray-300"
                >
                  {/* Friend Details */}
                  <div>
                    <p className="text-white font-medium">{friend.name}</p>
                    <p className="text-gray-400 text-sm">{friend.email}</p>
                  </div>
                  {/* Remove Button */}
                  <button
                    className="text-white bg-red-600 hover:bg-red-800 py-1 px-3 rounded"
                    onClick={() => removeFriend(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Friend Card */}
          <div className="bg-dimGray rounded-lg p-4">
            <Heading text="Add People" variant="headingTitle" />

            <ul className="space-y-4 mt-4">
              {peopleToAdd.map((person, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gray-300"
                >
                  {/* Person Details */}
                  <div>
                    <p className="text-white font-medium">{person.name}</p>
                    <p className="text-gray-400 text-sm">{person.email}</p>
                  </div>
                  {/* Connect Button */}
                  <button
                    className="text-white bg-green-500 hover:bg-green-800 py-1 px-3 rounded"
                    onClick={() => connectFriend(index)}
                  >
                    Invite Friends
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Activity;
