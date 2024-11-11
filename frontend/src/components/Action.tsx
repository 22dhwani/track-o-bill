import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Eye from "../../assets/eye.svg";

function Action(props: {
  onEdit: () => void;
  onDelete: () => void;
  onDetail?: () => void;
  isDetail?: boolean;
}) {
  return (
    <div className="flex lg:gap-2  ml-auto items-center">
      {props.isDetail && (
        <div
          className="hover:bg-slate-100 hover:rounded-full lg:pr-2 lg:px-0 xs:px-2 "
          onClick={props.onDetail}
        >
          <img src={Eye} className="w-6  " />
        </div>
      )}
      <div
        className={`hover:bg-slate-100 hover:rounded-full lg:pr-2 lg:px-0 xs:px-2 py-2 ${
          props.isDetail && "px-1 lg:pr-0"
        }`}
        onClick={props.onEdit}
      >
        <img src={Edit} className="w-5  " />
      </div>
      <div
        className={`hover:bg-slate-100 hover:rounded-full px-2 py-2 ${
          props.isDetail && "px-1"
        }`}
        onClick={() => {
          props.onDelete();
        }}
      >
        <img src={Delete} className="w-5 " />
      </div>
    </div>
  );
}

export default Action;
