import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "../../styles/Breadcrumbs.css";
import Heading from "./Heading";

type BreadCrumb = {
  path: string;
  breadcrumb: string | null;
};

function BreadCrumb(props: { routes: BreadCrumb[] }) {
  const location = useLocation();

  const breadcrumbs = useBreadcrumbs(props.routes);

  return (
    <nav className="flex gap-3">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link
          key={match.pathname}
          to={match.pathname}
          className={
            match.pathname === location.pathname
              ? "breadcrumb-active flex gap-2"
              : "breadcrumb-not-active flex-gap-2"
          }
        >
          <Heading variant="subHeader" headingclassname="" text={breadcrumb} />
        </Link>
      ))}
    </nav>
  );
}

export default BreadCrumb;
