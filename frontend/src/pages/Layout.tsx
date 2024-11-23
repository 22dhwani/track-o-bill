import React, { useEffect, useState } from "react";
//import Sidebar from "../components/SideNav";

import SideNav from "../components/SideNav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";
import Heading from "../components/Heading";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = Cookies.get('userToken');
  //   if (!token) {
  //     navigate('/home');
  //   }
  // }, []);

  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const [isMobileCollapse, setIsMobileCollapse] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

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

      {/* Main Layout Content */}
      <div className={mainbarclass + " flex-grow  bg-black min-h-screen"}>
        <Topbar isCollapse={isCollapse} />
        {/* Top bar with search and Add Group button */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
