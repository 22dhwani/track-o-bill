import MobileSideNavLinkItem from "./MobileSideNavLinkItem";
import { Dashboard, User, Question, Type, Category, Traits } from "./Icons";
import Heading from "./Heading";

const MobileSideNavLinks = (props: {
  isCollapse?: boolean;
  isHover?: boolean;
  isMobileCollapse: boolean;
  onCollapse: () => void;
}) => {
  const mobileSideNavLinkClassName = `border-r-[0.3px] border-r-slate-200 bg-slate-900   text-black lg:flex  flex-col font-normal   h-screen  xs:mt-[2vh] overflow-y-hidden overflow-x-hidden`;
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
        link="/home/admin-user-managment"
        icon={
          <User
            color={
              location.pathname.startsWith("/home/admin-user-managment")
                ? "#F3C3F7"
                : "#fff"
            }
          />
        }
        title="Admin Users"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/assessment-type"
        icon={
          <Question
            color={
              location.pathname === "/home/assessment-type" ? "#F3C3F7" : "#fff"
            }
          />
        }
        title="Assessment Types"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/categories"
        icon={
          <Category
            color={
              location.pathname === "/home/categories" ? "#F3C3F7" : "#fff"
            }
          />
        }
        title="Categories"
        onClick={props.onCollapse}
      />
      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/questions"
        icon={
          <Type
            color={location.pathname === "/home/questions" ? "#F3C3F7" : "#fff"}
          />
        }
        title="Questions"
        onClick={props.onCollapse}
      />

      <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/personality-traits"
        icon={
          <Traits
            color={
              location.pathname === "/home/personality-traits"
                ? "#F3C3F7"
                : "#fff"
            }
          />
        }
        title="Personality Traits"
        onClick={props.onCollapse}
      />

      {/* <MobileSideNavLinkItem
        isMobileCollapse={props.isMobileCollapse}
        isCollapse={props.isCollapse ?? false}
        isHover={props.isHover ?? false}
        link="/home/answers"
        icon={
          <Answer
            color={
              location.pathname === "/home/answers"
                ? "#F3C3F7"
                : "#fff"
            }
          />
        }
        title="Answers"
        onClick={props.onCollapse}
      /> */}
    </div>
  );
};

export default MobileSideNavLinks;
