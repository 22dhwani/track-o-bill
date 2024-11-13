import React from "react";

const TableItem = (props: {
  children: React.ReactNode;
  title: string;
  className?: string;
  childrenClassName?: string;
}) => {
  return (
    <td
      className={` md:py-4  xs:py-2 xs:block md:table-cell ${props.className}`}
    >
      <div className="  lg:mx-0 flex items-center ">
        <span className="text-slate-400 xs:visible md:hidden mr-3 font-bold ">
          {props.title}
        </span>
        <div className={props.childrenClassName}>{props.children}</div>
      </div>
    </td>
  );
};

export default TableItem;
