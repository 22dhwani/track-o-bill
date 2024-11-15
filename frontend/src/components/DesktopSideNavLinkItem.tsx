import { NavLink } from "react-router-dom";
import styles from "../styles/SideNavLinks.module.css";

export default function DesktopSideNavLinkItem(props: {
  isCollapse: boolean;
  isHover: boolean;
  link: string;
  icon?: any;
  title: string;
}) {
  return (
    <NavLink
      style={({ isActive }) =>
        isActive
          ? {
              color: "#F3C3F7",
              borderRadius: "1px",
              borderLeft: "3.5px #F3C3F7 solid",
              backgroundColor: "transparent",
            }
          : {}
      }
      className={
        props.isCollapse || (!props.isCollapse && props.isHover)
          ? `${styles.sidenavlinks}  tracking-wider box-border flex flex-row w-full font-roboto-semibold  font-semibold text-white text-sm `
          : `${styles.sidenavlinks} tracking-wider box-border  w-full  font-roboto-semibold text-white text-sm flex items-center justify-center `
      }
      to={props.link}
    >
      <div
        className={`${
          props.isCollapse || (!props.isCollapse && props.isHover)
            ? "mr-4"
            : "mr-0"
        }`}
      >
        {props.icon}
      </div>
      {/* <img src={props.icon} className="mr-2" /> */}
      {(props.isCollapse || (!props.isCollapse && props.isHover)) && (
        <p>{props.title}</p>
      )}
    </NavLink>
  );
}
