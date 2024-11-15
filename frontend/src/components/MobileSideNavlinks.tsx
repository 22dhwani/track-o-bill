import MobileSideNavLinkItem from "./MobileSideNavLinkItem";
import {
  Dashboard,
  User,
  Question,
  Type,
  Category,
  Traits,
  Answer,
} from "./Icons";
import Heading from "./Heading";

const MobileSideNavLinks = (props: {
  isCollapse?: boolean;
  isHover?: boolean;
  isMobileCollapse: boolean;
  onCollapse: () => void;
}) => {
  const mobileSideNavLinkClassName = `border-r-[0.3px] border-r-slate-200 bg-[#1A1B1C]   text-black lg:flex  flex-col font-normal   h-screen  xs:mt-[2vh] overflow-y-hidden overflow-x-hidden`;
  return (
    <div
      className={`${mobileSideNavLinkClassName} ${
        !props.isMobileCollapse ? "xs:visible" : "xs:hidden"
      }`}
    >
      <div className="py-2">
        <Heading
          text="MAIN"
          variant="smallTitle"
          headingclassname={`tracking-wider text-sm pl-6 text-primaeryYellow  font-roboto-semibold`}
        />
        <MobileSideNavLinkItem
          isCollapse={props.isCollapse ?? false}
          isMobileCollapse={props.isMobileCollapse}
          isHover={props.isHover ?? false}
          link="/home/dashboard"
          icon={
            <Dashboard
              color={
                location.pathname.startsWith("/home/dashboard")
                  ? "#F3C3F7"
                  : "#fff"
              }
            />
          }
          title="Dashboard"
          onClick={props.onCollapse}
        />
      </div>
      <div className="pt-5">
        <Heading
          text="PAGES"
          variant="smallTitle"
          headingclassname={`tracking-wider !text-xs pl-6 text-primaeryYellow  font-roboto-semibold`}
        />
      </div>
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/groups"
        icon={
          <User
            color={
              location.pathname.startsWith("/home/groups") ? "#F3C3F7" : "#fff"
            }
          />
        }
        title="Groups"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/bills"
        icon={
          <Answer
            color={location.pathname === "/home/bills" ? "#F3C3F7" : "#fff"}
          />
        }
        title="Bills"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/activity"
        icon={
          <Question
            color={location.pathname === "/home/activity" ? "#F3C3F7" : "#fff"}
          />
        }
        title="Activity"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/my-profile"
        icon={
          <Category
            color={
              location.pathname === "/home/my-profile" ? "#F3C3F7" : "#fff"
            }
          />
        }
        title="My Profile"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/reset-password"
        icon={
          <Question
            color={
              location.pathname === "/home/reset-password" ? "#F3C3F7" : "#fff"
            }
          />
        }
        title="Reset Password"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/logout"
        icon={
          <Type
            color={location.pathname === "/home/logout" ? "#F3C3F7" : "#fff"}
          />
        }
        title="Logout"
        onClick={props.onCollapse}
      />
    </div>
  );
};

export default MobileSideNavLinks;
