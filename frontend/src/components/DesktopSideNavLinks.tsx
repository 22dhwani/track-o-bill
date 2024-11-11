import { Dashboard, User, Question, Type, Category, Traits } from "./Icons";
import DesktopSideNavLinkItem from "./DesktopSideNavLinkItem";
import { useLocation } from "react-router-dom";
import Heading from "./Heading";

const SideNavLinks = (props: { isCollapse: boolean; isHover: boolean }) => {
  const sideNavLinkClass = `bg-slate-900 -mt-10 xl:py-[3vh] lg:py-[2.8vh] text-black lg:flex    w-full  text-md flex-col font-normal lg:mt-0  h-screen xs:hidden  overflow-y-scroll !relative !overflow-x-hidden border-r-[0.3px] border-r-slate-200`;
  const location = useLocation();
  return (
    <div className={`${sideNavLinkClass}`}>
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
                location.pathname.startsWith("/home/admin-user-managment")
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/admin-user-managment"
          title="Admin Users"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Question
              color={
                location.pathname === "/home/assessment-type"
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/assessment-type"
          title="Assessment Types"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Category
              color={
                location.pathname === "/home/categories" ? "#F3C3F7" : "#fff"
              }
            />
          }
          link="/home/categories"
          title="Categories"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Type
              color={
                location.pathname === "/home/questions" ? "#F3C3F7" : "#fff"
              }
            />
          }
          link="/home/questions"
          title="Questions"
        />
        <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Traits
              color={
                location.pathname === "/home/personality-traits"
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/personality-traits"
          title="Personality Traits"
        />

        {/* <DesktopSideNavLinkItem
          isCollapse={props.isCollapse}
          isHover={props.isHover}
          icon={
            <Answer
              color={
                location.pathname === "/home/answers"
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          link="/home/answers"
          title="Answers"
        /> */}
      </div>
    </div>
  );
};

export default SideNavLinks;
