import React, { useState } from "react";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Button from "../components/Button";
import BillModal from "./BillModal";
import Input from "../components/Input";

function Bill() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions] = useState([
    {
      date: "Oct 28, 2022",
      user: "Phoenix Baker",
      transactionId: "gj9508...kfgh",
      status: "Pending",
      amount: "+ $1,200.00",
      statusColor: "bg-primaeryYellow text-black",
    },
    {
      date: "Oct 28, 2022",
      user: "Orlando Diggs",
      transactionId: "ch8755...idhf",
      status: "Paid",
      amount: "- $940.00",
      statusColor: "bg-green-400 text-black",
    },
    {
      date: "Oct 28, 2022",
      user: "Natali Craig",
      transactionId: "bl6416...wkch",
      status: "Paid",
      amount: "+ $1,456.50",
      statusColor: "bg-green-400 text-black",
    },
    {
      date: "Oct 28, 2022",
      user: "Natali Craig",
      transactionId: "bl6416...wkch",
      status: "Paid",
      amount: "+ $1,456.50",
      statusColor: "bg-green-400 text-black",
    },
    {
      date: "Oct 24, 2022",
      user: "Olivia Rhye",
      transactionId: "dl0803...kgj8",
      status: "Past Due",
      amount: "- $810.00",
      statusColor: "bg-red-400 text-white",
    },
    {
      date: "Oct 24, 2022",
      user: "Dhwani Rhye",
      transactionId: "dl0803...kgj8",
      status: "Past Due",
      amount: "- $810.00",
      statusColor: "bg-red-400 text-white",
    },
  ]);
  const buttonClassName =
    "   w-max   xs:mx-auto md:mx-0  rounded-sm text-sm font-family-roboto tracking-wide ";
  const [searchSuggestions] = useState([
    { type: "user", name: "Olivia Rhye", avatar: "path/to/avatar1.png" },
    { type: "user", name: "Oliver Wilkinson", avatar: "path/to/avatar2.png" },
    { type: "file", name: "oliv_shop_invoice065.pdf" },
  ]);

  const [filters, setFilters] = useState({
    type: "All",
    date: "Oct 24 - 30, 2022",
  });
  const [openBill, setopenBill] = useState(false);

  return (
    <Card className=" bg-transparent min-h-screen">
      {openBill && (
        <BillModal
          open={openBill}
          onClose={() => {
            setopenBill(false);
          }}
        />
      )}
      <div className="flex justify-between lg:items-center">
        <Heading
          text="Your Bills"
          variant="bigTitle"
          headingclassname="text-white"
        />
        <Button
          onClick={() => setopenBill(true)}
          type="submit"
          variant="filled"
          color="primary"
          buttonClassName={buttonClassName}
          centerclassname="flex justify-center items-center"
        >
          Add Bill
        </Button>
      </div>

      <div className="bg-dimGray my-5 shadow-md rounded-lg p-5">
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3">
            <Input
              type="text"
              className="w-full px-4  border border-gray-300 rounded-lg focus:outline-none focus:ring-2  text-white focus:ring-blue-400 bg-black"
              placeholder="Search by name, ID, or file"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="absolute top-12 left-0 w-full bg-black shadow-lg rounded-lg z-10">
                {searchSuggestions
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex text-white items-center p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      {suggestion.type === "user" ? (
                        <img
                          src={suggestion.avatar}
                          alt={suggestion.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <span className="w-8 h-8 bg-black flex items-center justify-center rounded-full mr-3">
                          📄
                        </span>
                      )}
                      <span>{suggestion.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {["All", "Income", "Outcome"].map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, type })}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filters.type === type
                    ? "bg-primaryPurple text-white"
                    : "bg-black text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <div>
            <button className="flex items-center px-4 py-2 rounded-lg bg-black text-gray-300">
              <span className="mr-2">{filters.date}</span>
              📅
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-6">
          <table className="min-w-full bg-black  rounded-lg overflow-hidden">
            <thead className="bg-black">
              <tr>
                <th className="text-left p-4 text-white">Date</th>
                <th className="text-left p-4 text-white">User</th>
                <th className="text-left p-4 text-white">Transaction ID</th>
                <th className="text-left p-4 text-white">Status</th>
                <th className="text-right p-4 text-white">Amount</th>
              </tr>
            </thead>
            <tbody className="mb-4">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="!border-b-[1px] border-b-slate-600 py-2 text-gray-300"
                >
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4 flex items-center">
                    <span className="font-medium">{transaction.user}</span>
                  </td>
                  <td className="p-4">{transaction.transactionId}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${transaction.statusColor}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4  text-right">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

export default Bill;
