import React, { useEffect, useState } from "react";
//import Sidebar from "../components/SideNav";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DesktopSideBar from "../components/DesktopSideBar";
import SideNav from "../components/SideNav";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReactChart from "../components/ReactChart.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";
import Heading from "../components/Heading";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('userToken');
    if (!token) {
      navigate('/home');
    }
  }, []);


  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [isMobileCollapse, setIsMobileCollapse] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Low",
        data: [20, 25, 15, 30, 20, 25, 30, 20, 25],
        backgroundColor: "#eab308", // yellow
      },
      {
        label: "Medium",
        data: [40, 35, 45, 30, 40, 35, 30, 40, 35],
        backgroundColor: "#a855f7", // purple
      },
      {
        label: "High",
        data: [40, 40, 40, 40, 40, 40, 40, 40, 40],
        backgroundColor: "#d1d5db", // gray
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Explicitly setting the position
        labels: {
          color: "#cbd5e1", // slate-300 color for the legend text
        },
      },
      title: {
        display: true,
        text: "Customer Breakdown",
        color: "#cbd5e1", // slate-300 color for the title text
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5e1", // slate-300 color for x-axis labels
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#cbd5e1", // slate-300 color for y-axis labels
        },
      },
    },
  };

  // const [text, setText] = useState("<<");
  // const [mobiletext, setMobileText] = useState("<<");
  const collapseHandler = () => {
    setIsCollapse((prevState) => {
      return !prevState;
    });
  };
  const mobileCollapseHandler = () => {
    setIsMobileCollapse((prevState) => {
      return !prevState;
    });
  };

  const hoverHandler = () => {
    setIsHover((prevState) => {
      return !prevState;
    });
  };

  //mobile side nav bar classes
  const mobilesidebarcollapse = !isMobileCollapse
    ? "!w-60 relative z-40  "
    : " z-40  ";

  //desktop side nav bar class
  const sideBarHover =
    isHover && !isCollapse
      ? "w-60 delay-1000 transition ease-in z-40 relative "
      : " ";

  const mainOnHover =
    isHover && !isCollapse
      ? " transition ease-in xl:pl-[5.187500000000001vw]    absolute w-full h-full  overflow-y-scroll"
      : "relative  w-full overflow-y-scroll";

  const sidebarcollapse = !isCollapse
    ? " z-40 transition ease-in "
    : " z-40 w-60 tranisition ease-in";
  const mainclasscollapse = !isCollapse
    ? "  transition ease-in  overflow-y-scroll"
    : " w-full overflow-y-scroll";
  const sidebarclass = sidebarcollapse + " " + sideBarHover;
  const mainbarclass = mainclasscollapse + " " + mainOnHover;

  const users = [
    {
      id: 1,
      name: "Mikey Lawrence",
      email: "heymikey@gmail.com",
      avatar: "../../images/man.avif",
      status: "Enrolled",
      statusColor: "text-primaryYellow",
      progress: 70,
    },
    {
      id: 2,
      name: "Ashwin Santiago",
      email: "ashwin@santiago.com",
      avatar: "../../images/women.jpg",
      status: "Not Enrolled",
      statusColor: "text-gray-500",
      progress: 60,
    },
    // Add more users as needed
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideNav
        mobileSideBarClassName={mobilesidebarcollapse}
        className={sidebarclass}
        onHover={hoverHandler}
        isCollapse={isCollapse}
        isMobileCollapse={isMobileCollapse}
        isHover={isHover}
        onCollapse={collapseHandler}
        onMobileCollapse={mobileCollapseHandler}
      />

      {/* Main Dashboard Content */}
      <div className={mainbarclass + " flex-grow  bg-black min-h-screen"}>
        <Topbar isCollapse={isCollapse} />
        {/* Top bar with search and Add Group button */}
        <Card className=" bg-transparent text-white  !overflow-x-clip h-max">
          <Heading text="Dashboard" variant="bigTitle" />
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
            {/* Websites Monitored Card */}
            <div className="bg-dimGray rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-white">
                Websites monitored
              </h2>
              <p className="text-slate-300">
                You're using 80% of available spots.
              </p>
              <div className="flex items-center justify-center mt-4">
                <div className="relative w-24 h-24">
                  <div className="w-full h-full rounded-full border-4 border-purple-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primaryPurple">
                    164
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-slate-400">
                You’ve almost reached your limit
              </p>
              <a href="#" className="text-purple-600 text-center block mt-2">
                Upgrade plan
              </a>
            </div>

            {/* Customer Breakdown Card */}
            <div className="bg-dimGray rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-white">
                Customer breakdown
              </h2>
              <p className="text-slate-300 mb-4">
                Keep track of customers and their ratings.
              </p>
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="bg-dimGray rounded-lg shadow p-6 mb-5">
            <ReactChart label={"Analytics"} />
          </div>
          {/* Customer Movements Card */}
          <div className="bg-dimGray rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex justify-between lg:flex-row xs:flex-col xs:gap-5 items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Customer movements
              </h2>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-black text-white rounded-md">
                  View all
                </button>
                <button className="px-4 py-2 bg-primaryPurple text-white rounded-md">
                  Monitored
                </button>
                <button className="px-4 py-2 bg-primaryPurple text-white rounded-md">
                  Unmonitored
                </button>
              </div>
            </div>
            <div className="relative">
              <SearchBar
                className=" !py-3"
                formclassName="!w-full"
                onChange={(key) => {
                  console.log(key);
                }}
              />
            </div>
            {/* Customer List */}
            <div className="mt-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex  lg:flex-row flex-col lg:items-center xs:gap-3 lg:gap-0 justify-between !border-b-[1px] border-b-black py-2"
                >
                  <div className="flex items-center space-x-4 my-3">
                    <img
                      src={user.avatar}
                      alt={`${user.name} Avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-slate-100 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div
                    className={`${user.statusColor} font-bold text-primaeryYellow`}
                  >
                    {user.status}
                  </div>
                  <div className="w-1/3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${user.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {/* Add more customer entries as needed */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
