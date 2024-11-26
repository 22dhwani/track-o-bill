import React, { useState } from "react";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Button from "../components/Button";
import BillModal from "./BillModal";
import AddMemberModal from "../components/AddMemberModal";
import SettleUpModal from "../components/SettleUpModal";
import LeaveGroupModal from "../components/LeaveGroupModal";
import EditTransModal from "../components/EditTransModal";
import DeleteTransModal from "../components/DeleteTransModal";
import Input from "../components/Input";

import { useGroup } from "../context/GroupContext";
import { useListAllTransactionsQuery } from "../features/api/transactionSlice";
import { useGetSettleUpDataQuery } from "../features/api/settleUpSlice";
import { useTransaction } from "../context/transactionContext";

interface Transaction {
  transaction_id: number;
  name: string;
  payer: string;
  payer_id: number;
  transaction_adder_id: number;
  transaction_adder: string;
  users_involved_id: number[];
  users_involved: string[];
  amount_users_own: number[];
  total_amount: string; // or number if you prefer to handle it as a number
  date: string; // or Date if you want to parse it
}
interface TransactionData {
  detail: Transaction[]; 
}
function Bill() {

  const { setTransactionId } = useTransaction();
  
  const [searchQuery, setSearchQuery] = useState("");
  const { groupId } = useGroup();
  const { data: AllTransactions, isLoading, isError, error } = useListAllTransactionsQuery(Number(groupId)); 
  const { data: settleUpData, isLoading: isLoadingSettleUp, isError: isErrorSettleUp, error: errorSettleUp } = useGetSettleUpDataQuery(Number(groupId));


  console.log(AllTransactions);
  console.log(settleUpData);

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
    "   w-max  !border-none xs:mx-auto md:mx-0  rounded-sm text-sm font-family-roboto tracking-wide ";
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
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openSettle, setopenSettle] = useState(false);
  const [openLeaveGroup, setopenLeaveGroup] = useState(false);
  const [openEditBill, setopenEditBill] = useState(false);
  const [openDeleteBill, setopenDeleteBill] = useState(false);

  return (
    <>
      <Card className=" bg-transparent min-h-screen">
        {openBill && (
          <BillModal
            open={openBill}
            onClose={() => {
              setopenBill(false);
            }}
          />
        )}
        {openEditBill && (
          <EditTransModal
            open={openEditBill}
            onClose={() => {
              setopenEditBill(false);
            }}
          />
        )}
        {openDeleteBill && (
          <DeleteTransModal
            open={openDeleteBill}
            onClose={() => {
              setopenDeleteBill(false);
            }}
          />
        )}
        {openSettle && (
          <SettleUpModal
            open={openSettle}
            onClose={() => {
              setopenSettle(false);
            }}
          />
        )}
        {openLeaveGroup && (
          <LeaveGroupModal
            open={openLeaveGroup}
            onClose={() => {
              setopenLeaveGroup(false);
            }}
          />
        )}
        <div className="flex justify-between lg:items-center">
          <Heading
            text="Your Bills"
            variant="bigTitle"
            headingclassname="text-white"
          />
          <div className="flex gap-4">
            <Button
              onClick={() => setopenSettle(true)}
              type="submit"
              variant="filled"
              color="primary"
              buttonClassName={
                buttonClassName + " bg-green-500 hover:bg-green-700"
              }
              centerclassname="flex justify-center items-center"
            >
              Settle Up
            </Button>
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
            <Button
              onClick={() => setOpenAddMember(true)}
              type="submit"
              variant="filled"
              color="primary"
              buttonClassName={
                buttonClassName + " bg-blue-500 hover:bg-blue-700"
              }
              centerclassname="flex justify-center items-center"
            >
              Add Member
            </Button>
            <Button
              onClick={() => setopenLeaveGroup(true)}
              type="submit"
              variant="filled"
              color="primary"
              buttonClassName={
                buttonClassName + " bg-blue-500 hover:bg-blue-700"
              }
              centerclassname="flex justify-center items-center"
            >
              Leave Group
            </Button>
          </div>
        </div>

        <div className="bg-dimGray my-5 shadow-md rounded-lg p-5">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3">
              <Heading
                variant="headingTitle"
                text= { settleUpData?.bill[0] ? settleUpData?.bill[0] >= 0 ? `You are owed $${settleUpData?.bill[0]} overall` : `You owe $${settleUpData?.bill[0]} overall` : "You owe nothing"}
                headingclassname={` !text-${settleUpData?.bill[0] ? settleUpData?.bill[0] >= 0 ? "green" : "red" : "green"}-500  font-semibold`}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {["All", "Owed"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilters({ ...filters, type })}
                  className={`px-4 py-2 rounded-lg text-sm ${filters.type === type
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
                  <th className="text-right p-4 text-white">Amount</th>
                </tr>
              </thead>
              <tbody className="mb-4">
                {AllTransactions?.detail.map((transaction, index) => (
                  <tr
                    key={index}
                    className="!border-b-[1px] border-b-slate-600 py-2 text-gray-300"
                  >
                    <td className="p-4">{transaction.date.split('T')[0]}</td>
                    <td className="p-4 flex items-center">
                      <span className="font-medium">{transaction.payer}</span>
                    </td>
                    <td className="p-4">{transaction.transaction_id}</td>
                    {/* <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${transaction.statusColor}`}
                      >
                        {transaction.status}
                      </span>
                    </td> */}
                    <td className="p-4  text-right">{transaction.total_amount}</td>
                    <div className="inline-flex items-center ml-4 space-x-2 gap-2">
                      {/* Edit SVG */}
                      <button className="hover:text-blue-500" onClick={() => {
                        setopenEditBill(true);
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                        </svg>
                      </button>
                      {/* Delete SVG */}
                      <button className="hover:text-red-500" onClick={() => {
                        console.log(transaction.transaction_id);
                        setopenDeleteBill(true);
                        setTransactionId(transaction.transaction_id.toString());
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <AddMemberModal
        isOpen={openAddMember}
        onClose={() => setOpenAddMember(false)}
      />
    </>
  );
}

export default Bill;
