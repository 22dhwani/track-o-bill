import { Dashboard, User, Question, Type, Category, Answer } from "./Icons";
import DesktopSideNavLinkItem from "./DesktopSideNavLinkItem";
import { useLocation } from "react-router-dom";
import Heading from "./Heading";
import { useState } from "react";
import Modal from "./Modal";
import LogoutModal from "./LogoutModal";
import styles from "../styles/SideNavLinks.module.css";

const SideNavLinks = (props: { isCollapse: boolean; isHover: boolean }) => {
  const sideNavLinkClass = `bg-[#1A1B1C] -mt-10 xl:py-[3vh] lg:py-[2.8vh] text-black lg:flex    w-full  text-md flex-col font-normal lg:mt-0  h-screen xs:hidden  overflow-y-scroll !relative !overflow-x-hidden `;
  const [openLogout, setopenLogout] = useState(false);
  const location = useLocation();
  return (
    <div className={`${sideNavLinkClass}`}>
      {openLogout && (
        <Modal className="!py-2">
          <LogoutModal
            onClose={() => {
              setopenLogout(false);
            }}
          />
        </Modal>
      )}
      <div className="py-2">
        <Heading
          text="MAIN"
          variant="smallTitle"
          headingclassname={`tracking-wider !text-xs ${
            props.isCollapse || (!props.isCollapse && props.isHover)
              ? "pl-6"
              : "pl-0 flex items-center justify-center"
          } text-primaeryYellow  font-roboto-semibold`}
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Dashboard
              color={
                location.pathname.startsWith("/dashboard") ? "#F3C3F7" : "#fff"
              }
            />
          }
          link="/dashboard"
          title="Dashboard"
        />
      </div>
      <div className="py-2">
        <Heading
          text="PAGES"
          variant="smallTitle"
          headingclassname={`tracking-wider !text-xs ${
            props.isCollapse || (!props.isCollapse && props.isHover)
              ? "pl-6"
              : "pl-0 flex items-center justify-center"
          } text-primaeryYellow  font-roboto-semibold`}
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <User
              color={
                location.pathname.startsWith("/home/groups")
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/groups"
          title="Groups"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Answer
              color={location.pathname === "/home/bills" ? "#F3C3F7" : "#fff"}
            />
          }
          link="/home/bills"
          title="Bills"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Question
              color={
                location.pathname === "/home/activity" ? "#F3C3F7" : "#fff"
              }
            />
          }
          link="/home/activity"
          title="Activity"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Category
              color={
                location.pathname === "/home/my-profile" ? "#F3C3F7" : "#fff"
              }
            />
          }
          link="/home/my-profile"
          title="My Profile"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Question
              color={
                location.pathname === "/home/reset-password"
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/reset-password"
          title="Reset Password"
        />

        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Type
              color={location.pathname === "/home/logout" ? "#F3C3F7" : "#fff"}
            />
          }
          onClick={() => setopenLogout(true)}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default SideNavLinks;
