import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Card from "../components/Card";
import Heading from "../components/Heading";

function GroupDetail() {
  const navigate = useNavigate(); // Initialize the navigate function

  const activities = [
    {
      id: 1,
      user: "Durva",
      emoji: "😊",
      action: "added",
      item: "Milk",
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
      item: "Groceries",
      amount: "You owe $3.50",
      owed: true,
      date: "Monday",
      icon: "🧴",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      user: "Devansh M.",
      action: "added",
      item: "Snacks",
      amount: "You get back $2.75",
      owed: false,
      date: "Tuesday",
      icon: "🍪",
      color: "bg-gray-100 text-gray-600",
    },
    {
      id: 5,
      user: "You",
      action: "added",
      item: "Juice",
      amount: "You get back $1.50",
      owed: false,
      date: "Wednesday",
      icon: "🧃",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <Card className="bg-transparent text-white !overflow-x-clip h-max">
      <div className="flex items-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent text-white px-3 py-2 rounded-full mr-4 hover:bg-gray-700"
        >
          Back
        </button>

        <Heading text="Homies" variant="bigTitle" />
      </div>

      <div className="w-full gap-10">
        <div className="bg-dimGray rounded-lg h-max my-5">
          <div className="p-4">
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

                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.emoji} {activity.action}{" "}
                      <span className="font-semibold">"{activity.item}"</span>{" "}
                    </p>
                    <p
                      className={`font-medium ${
                        activity.owed === true
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
      </div>
    </Card>
  );
}

export default GroupDetail;
